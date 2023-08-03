import mongoose, { mongo } from "mongoose";

// Declare the Schema of the mongo Model

const cartSchema = new mongoose.Schema({
    // products: [
    //     {
    //         product: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "Product",
    //         },
    //         count: Number,
    //         color: String,
    //         price: Number,
    //     },
        
    // ],
    // cartTotal: Number,
    // paymentIntent: {},

    // totalAfterDiscount: Number,
    // orderBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User", 
    // }
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
    }


},
{
    timestamps: true,
});

export default mongoose.model("Cart", cartSchema);
