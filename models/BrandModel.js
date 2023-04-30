import mongoose from "mongoose";

// Declare the Schema of the mongo Model

const brandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
},
{
    timestamps: true,
});

export default mongoose.model("Brand", brandSchema);
