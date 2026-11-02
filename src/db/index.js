import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("MongoDB URI not found in environment variables.");
    }

    const connectionInstance = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected. DB host: ${connectionInstance.connection.host}`);
};

export default connectDB;