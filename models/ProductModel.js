import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    brand: {
        type: String,
        // enum: ["Apple", "Samsung", "Lenovo", "Mp",],
    },

    quantity: {
        type: Number,
        required: true,
        select: false,
    },

    sold: {
        type: Number,
        default: 0,
        select: false,
    },

    images: [
            {
                public_id: String,
                url: String
            }
        ],

    color: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
    }],

    tags: String,

    ratings: [
        {
            star: Number,
            comment: String,
            postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', }
        }
    ],
    totalrating: {
        type: String,
        default: 0,
    }
    
},
{
    timestamps: true,
});

export default mongoose.model("Product", ProductSchema);


