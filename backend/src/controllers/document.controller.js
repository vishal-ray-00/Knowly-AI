import Document from "../models/document.model.js";
import Chunk from "../models/chunk.model.js";
import { processDocument } from "../services/document.processor.js";
import { deletePdf } from "../services/storage.service.js";
import { findOwnedDocument } from "../services/document.service.js";
import { deleteChatsForDocument } from "../services/chat.service.js";


const notFound = (res) =>
    res.status(404).json({ success: false, message: "Document not found" });

export const uploadDocument = async (req, res) => {
    try {
        const { file } = req;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Please attach a PDF file",
            });
        }

        // Real PDFs start with "%PDF"; the mimetype alone can be faked
        if (file.buffer.subarray(0, 4).toString() !== "%PDF") {
            return res.status(400).json({
                success: false,
                message: "This file is not a valid PDF",
            });
        }

        const document = await Document.create({
            user: req.user._id,
            title: file.originalname.replace(/\.pdf$/i, "").slice(0, 120),
            originalName: file.originalname,
            status: "processing",
        });

        res.status(202).json({
            success: true,
            message: "Upload received. Processing started.",
            document,
        });

        processDocument(document._id, req.user._id, file.buffer);
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ success: false, message: "Upload failed" });
    }
};

export const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({ success: true, documents });
    } catch (error) {
        console.error("Get documents error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch documents",
        });
    }
};

export const getDocument = async (req, res) => {
    try {
        const document = await findOwnedDocument(req.params.id, req.user._id);
        if (!document) return notFound(res);

        res.status(200).json({ success: true, document });
    } catch (error) {
        console.error("Get document error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch document",
        });
    }
};


export const deleteDocument = async (req, res) => {
    try {
        const document = await findOwnedDocument(req.params.id, req.user._id);
        if (!document) return notFound(res);

        if (document.status === "processing") {
            return res.status(409).json({
                success: false,
                message: "Document is still processing. Try again in a moment.",
            });
        }

        await Chunk.deleteMany({ document: document._id });
        await deleteChatsForDocument(document._id);

        if (document.publicId) {
            await deletePdf(document.publicId).catch((error) =>
                console.error("Cloudinary delete failed:", error.message)
            );
        }

        // The record goes last, so a failed delete can simply be retried
        await document.deleteOne();

        res.status(200).json({ success: true, message: "Document deleted" });
    } catch (error) {
        console.error("Delete document error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete document",
        });
    }
};