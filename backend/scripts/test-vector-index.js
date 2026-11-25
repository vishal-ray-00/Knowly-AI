import "dotenv/config";
import mongoose from "mongoose";
import Chunk from "../src/models/chunk.model.js";

await mongoose.connect(process.env.MONGODB_URI);

const sample = await Chunk.findOne().select("+embedding").lean();

if (!sample) {
    console.log("No chunks found. Upload a PDF first.");
    await mongoose.disconnect();
    process.exit(0);
}

console.log(
    `Sample chunk: page ${sample.pageNumber}, ${sample.embedding.length} dimensions\n`
);

const results = await Chunk.aggregate([
    {
        $vectorSearch: {
            index: "chunk_vector_index",
            path: "embedding",
            queryVector: sample.embedding,
            numCandidates: 100,
            limit: 4,
            filter: { user: sample.user, document: sample.document },
        },
    },
    {
        $project: {
            text: 1,
            pageNumber: 1,
            score: { $meta: "vectorSearchScore" },
        },
    },
]);

console.log(`Results: ${results.length}`);
results.forEach((result, i) => {
    console.log(
        `${i + 1}. score ${result.score.toFixed(3)} | page ${result.pageNumber} | ${result.text.slice(0, 60)}...`
    );
});

await mongoose.disconnect();