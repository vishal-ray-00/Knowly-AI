import mongoose from "mongoose";
import Document from "../models/document.model.js";

export const findOwnedDocument = async (id, userId) => {
    if(!mongoose.isValidObjectId(id)) return null;
    return Document.findOne({ _id: id, user: userId});
}