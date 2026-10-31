import moongoose from "mongoose";

const connectDB = async () => {
    try {
        await moongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;