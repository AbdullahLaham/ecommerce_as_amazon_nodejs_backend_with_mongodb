import mongoose from "mongoose"

export const dbConnect = () => {
    try {
        const conn = mongoose.connect('mongodb+srv://abed26194:89yzX9QI2lSuFuEL@cluster0.zrkltj7.mongodb.net/?retryWrites=true&w=majority');
        console.log("Database Connected Successully");
    } catch (error) {
        console.log("Database Error");
    } 
}
