import mongoose from "mongoose";

// A copy of a passage the answer was based on (not a reference to a Chunk)
const sourceSchema = new mongoose.Schema(
    {
        pageNumber: { type: Number, required: true },
        chunkIndex: { type: Number, required: true },
        text: { type: String, required: true },
        score: { type: Number },
    },
    { _id: false }
);

const messageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true,
        },
        content: { type: String, required: true, maxlength: 20000 },
        sources: { type: [sourceSchema], default: undefined },
        status: {
            type: String,
            enum: ["complete", "stopped"],
            default: "complete",
        },
    },
    { timestamps: true }
);

// "The messages of this chat, in time order"
messageSchema.index({ chat: 1, createdAt: 1 });

export default mongoose.model("Message", messageSchema);