import mongoose, { mongo } from "mongoose";

// Declare the Schema of the mongo Model

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            count: Number,
            color: String,
        },
        
    ],

    paymentIntent: {},

    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: ["Not Processed", "Cash On Delivery", "Processing", "Dipatched", "Cancelled", "Delivered"],
    },
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    }
    


},
{
    timestamps: true,
});

export default mongoose.model("Order", orderSchema);
