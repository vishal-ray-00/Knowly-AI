import { randomUUID } from "crypto";
import cloudinary from "../config/cloudinary.config.js";

export const uploadPdf = (buffer) =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "knowly/documents",
                resource_type: "raw",
                public_id: `${randomUUID()}.pdf`,
            },
            (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(buffer);
    });

export const deletePdf = (publicId) =>
    cloudinary.uploader.destroy(publicId, { resource_type: "raw" });

