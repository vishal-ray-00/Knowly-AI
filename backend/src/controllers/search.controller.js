import { z } from "zod";
import { findOwnedDocument } from "../services/document.service.js";
import { searchChunks } from "../services/search.service.js";

const searchSchema = z.object({
    question: z
        .string()
        .trim()
        .min(3, "Question is too short")
        .max(500, "Question is too long (max 500 characters)"),
});

export const searchDocument = async (req, res) => {
    try {
        const parsed = searchSchema.safeParse(req.body ?? {});
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: parsed.error.issues[0].message,
            });
        }

        const document = await findOwnedDocument(req.params.id, req.user._id);
        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        if (document.status !== "ready") {
            return res.status(409).json({
                success: false,
                message: "This document is not ready yet",
            });
        }

        const { question } = parsed.data;
        const results = await searchChunks({
            userId: req.user._id,
            documentId: document._id,
            question,
        });

        res.status(200).json({ success: true, question, results });
    } catch (error) {
        console.error("Search error:", error);

        if (error.userMessage) {
            return res.status(503).json({
                success: false,
                message: error.userMessage,
            });
        }
        res.status(500).json({ success: false, message: "Search failed" });
    }
};