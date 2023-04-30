import mongoose from "mongoose";

// Declare the Schema of the mongo Model

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    }

},
{
    timestamps: true,
});

export default mongoose.model("Coupon", couponSchema);
