import Document from "../models/document.model.js";
import Chunk from "../models/chunk.model.js";
import { extractPages } from "./pdf.service.js";
import { chunkPages } from "./chunk.service.js";
import { embedDocuments } from "./embedding.service.js"; 
import { uploadPdf, deletePdf } from "./storage.service.js";

const MIN_TOTAL_CHARS = 50;

// An error whose message is safe to show to the user
const userError = (message) =>
    Object.assign(new Error(message), { userMessage: message });

const logCleanupError = (label) => (error) =>
    console.error(`${label}:`, error.message);

const markFailed = async (documentId, error, uploaded) => {
    // Most important first: tell the user it failed
    await Document.findByIdAndUpdate(documentId, {
        status: "failed",
        errorMessage: error.userMessage || "Could not process this PDF",
    }).catch(logCleanupError("Could not mark document as failed"));

    // Then undo partial work, best effort
    await Chunk.deleteMany({ document: documentId }).catch(
        logCleanupError("Could not delete partial chunks")
    );
    if (uploaded) {
        await deletePdf(uploaded.public_id).catch(
            logCleanupError("Could not delete uploaded file")
        );
    }
};

// Never throws: it runs in the background and nobody is waiting on it.
export const processDocument = async (documentId, userId, buffer) => {
    const startedAt = Date.now();
    let uploaded;

    try {
        const { numPages, pages } = await extractPages(buffer);

        const totalChars = pages.reduce((sum, page) => sum + page.length, 0);
        if (totalChars < MIN_TOTAL_CHARS) {
            throw userError(
                "No readable text found. Scanned PDFs are not supported yet."
            );
        }

        const chunks = await chunkPages(pages);
        if (chunks.length === 0) {
            throw userError("No readable text found in this PDF.");
        }

        // new: one vector per chunk, returned in the same order
        const vectors = await embedDocuments(chunks.map((chunk) => chunk.text));
        if (vectors.length !== chunks.length) {
            throw new Error("Embedding count did not match chunk count");
        }

        uploaded = await uploadPdf(buffer);

        await Chunk.insertMany(
            chunks.map((chunk, i) => ({
                ...chunk,
                embedding: vectors[i], // new
                document: documentId,
                user: userId,
            }))
        );

        await Document.findByIdAndUpdate(documentId, {
            status: "ready",
            pageCount: numPages,
            chunkCount: chunks.length,
            fileUrl: uploaded.secure_url,
            publicId: uploaded.public_id,
        });

        console.log(
            `Document ${documentId} ready: ${chunks.length} chunks in ${Date.now() - startedAt}ms`
        );
    } catch (error) {
        console.error(`Processing failed for document ${documentId}:`, error);
        await markFailed(documentId, error, uploaded);
    }
};