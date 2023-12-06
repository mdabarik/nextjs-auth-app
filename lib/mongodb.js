import mongoose from "mongoose";

export const connectMongoDB = async() => {
    try {
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongoDB");
    } catch(error) {
        console.log("Error connecting to mongoDB", error);
    }
}