import mongoose from "mongoose"

export const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected Successully");
    } catch (error) {
        console.log("Database Error");
    } 
}
