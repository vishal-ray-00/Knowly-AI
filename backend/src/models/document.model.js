import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        title: { type: String, required: true, trim: true },
        originalName: { type: String, required: true },
        fileUrl: { type: String },
        publicId: { type: String },
        pageCount: { type: Number, default: 0 },
        chunkCount: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ["processing", "ready", "failed"],
            default: "processing",
        },
        errorMessage: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("Document", documentSchema);