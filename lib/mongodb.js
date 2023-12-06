export const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONDODB_URI);
        console.log("Connected to mongoDB");
    } catch(error) {
        console.log("Error connecting to mongoDB", error);
    }
}