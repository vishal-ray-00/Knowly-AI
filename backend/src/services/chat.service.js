import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

// Finds the chat for a document, or creates it on the first message.
export const getOrCreateChat = async (userId, documentId) => {
    const filter = { user: userId, document: documentId };

    try {
        return await Chat.findOneAndUpdate(
            filter,
            { $setOnInsert: filter },
            { upsert: true, new: true }
        );
    } catch (error) {
        // Two first messages at the same instant can race. The unique index
        // rejects the loser, who simply reads the winner's chat.
        if (error.code === 11000) return Chat.findOne(filter);
        throw error;
    }
};

export const deleteChatsForDocument = async (documentId) => {
    const chats = await Chat.find({ document: documentId }).select("_id").lean();
    if (chats.length === 0) return;

    await Message.deleteMany({ chat: { $in: chats.map((chat) => chat._id) } });
    await Chat.deleteMany({ document: documentId });
};