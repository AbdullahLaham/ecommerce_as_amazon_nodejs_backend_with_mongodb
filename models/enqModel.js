import mongoose from "mongoose";

// Declare the Schema of the mongo Model

const enqSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        
    },
    mobile: {
        type: String,
        required: true,
        
    },
    comment: {
        type: String,
        required: true,
        
    },
    status: {
        type: String,
        default: "Submitted",
        enum: ['Submitted', 'Contacted', 'In Progress'],
    }

},
{
    timestamps: true,
});

export default mongoose.model("Enquiry", enqSchema);
