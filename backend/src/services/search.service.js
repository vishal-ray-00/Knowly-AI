import mongoose from "mongoose";
import Chunk from "../models/chunk.model.js";
import { embedQuery } from "./embedding.service.js";

const INDEX_NAME = "chunk_vector_index";
const NUM_CANDIDATES = 100;
const DEFAULT_LIMIT = 4;

// Finds the chunks of one document that are closest in meaning to the question.
export const searchChunks = async ({
    userId,
    documentId,
    question,
    limit = DEFAULT_LIMIT,
}) => {
    const queryVector = await embedQuery(question);

    return Chunk.aggregate([
        {
            $vectorSearch: {
                index: INDEX_NAME,
                path: "embedding",
                queryVector,
                numCandidates: NUM_CANDIDATES,
                limit,
                filter: {
                    user: new mongoose.Types.ObjectId(userId),
                    document: new mongoose.Types.ObjectId(documentId),
                },
            },
        },
        {
            // Aggregation ignores `select: false`, so list the fields explicitly
            $project: {
                _id: 0,
                text: 1,
                pageNumber: 1,
                chunkIndex: 1,
                score: { $meta: "vectorSearchScore" },
            },
        },
    ]);
};