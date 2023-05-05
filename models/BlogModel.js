import mongoose from "mongoose";

// Declare the Schema of the mongo Model

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numViews: {
        type: Number,
        default: 0,
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    isDisLiked: {
        type: Boolean,
        default: false,
    },
    likes: 
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    dislikes: 
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    image: {
        type: String,
        default: "https://www.shutterstock.com/image-photo/blog-information-website-concept-workplace-260nw-1101494699.jpg",
    },
    author: {
        type: String,
        default: "Admin",
    },
    images: [],
},
{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});

export default mongoose.model("Blog", blogSchema);
