import mongoose, { mongo } from "mongoose";

// Declare the Schema of the mongo Model

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            count: Number,
            color: String,
            price: Number,
        },
        
    ],
    cartTotal: Number,
    paymentIntent: {},

    totalAfterDiscount: Number,
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    }
    


},
{
    timestamps: true,
});

export default mongoose.model("Cart", cartSchema);
