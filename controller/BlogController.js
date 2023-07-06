import Blog from '../models/BlogModel.js';
import User from '../models/UserModel.js';
import asyncHandler from 'express-async-handler';
import { validateMongoDBID } from '../utils/validateMongodbId.js';
import {cloudinaryUploadImg} from '../utils/cloudinary.js';
import fs from 'fs';


export const createBlog = asyncHandler(async (req, res) =>   {
    try {
        const newBlog = await Blog.create(req.body);
        res.status(200).json(newBlog);
    } catch (error) {
        throw new Error(error);
    }
}
);

export const updateBlog = asyncHandler(async (req, res) =>   {
    let {id} = req.params;
    validateMongoDBID(id);
    try {
        let updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(updatedBlog);
    } catch (error) {
        throw new Error(error);
    }
}
)

export const getBlog = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        let blog = await Blog.findById(id).populate('likes').populate('dislikes');
        // let updateBlog = await Blog.findByIdAndUpdate(id, { "$inc": {"numViews": 1} }, {new: true});
        res.json(blog);
    } catch (error) {
        throw new Error(error);
    }
});


export const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        let blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        throw new Error(error);
    }
})


export const deleteBlog = asyncHandler(async (req, res) =>   {

    let {id} = req.params;

    try {
        let deletedBlog = await Blog.findByIdAndDelete(id);
        res.status(200).json(deletedBlog);
    } catch (error) {
        throw new Error(error);
    }
}
)

export const likeBlog = asyncHandler (async (req, res) => {
    const {blogId} = req.body;
    console.log(req.body, 'fffffffffffffffff')
    validateMongoDBID(blogId);
    try {
        // the blog you want to be liked
    const blog = await Blog.findById(blogId);
    // the current login user
    const {_id: loginUserId} = req?.user;
    let isLiked = blog?.likes.find((id) => id.toString() === loginUserId.toString());
    let alreadyDisliked = blog?.dislikes.find((id) => id.toString() === loginUserId.toString());
    if (alreadyDisliked) {
        console.log("isdisLiked");
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: {dislikes: loginUserId},
            isDisliked: false,

        }, {new: true});
        res.json(blog);
    }
    if (isLiked) {
        console.log("isLiked");
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: {likes: loginUserId},
            isLiked: false,

        }, {new: true});
        res.json(blog);
    } else {
        console.log("else");
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: {likes: loginUserId},
            isLiked: true,
        }, {new: true});
        res.json(blog);
    }

    } catch (error) {
        throw new Error(error);
    }
});




export const disLikeBlog = asyncHandler (async (req, res) => {
    const {blogId} = req.body;
    console.log(req.body, 'fffffffffffffffff')
    validateMongoDBID(blogId);
    try {
        // the blog you want to be liked
    const blog = await Blog.findById(blogId);
    // the current login user
    const {_id: loginUserId} = req?.user;
    let alreadyLiked = blog?.likes.find((id) => id.toString() === loginUserId.toString());
    let isDisliked = blog?.dislikes?.find((id) => id.toString() == loginUserId.toString());
    if (alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: {likes: loginUserId},
            isLiked: false,

        }, {new: true});

        res.json(blog);
    }

    if (isDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: {dislikes: loginUserId},
            isDisliked: false,

        }, {new: true});
        res.json(blog);
    } else {
        console.log("else");
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: {dislikes: loginUserId},
            isDisliked: true,
        }, {new: true});
        res.json(blog);
    }

    } catch (error) {
        throw new Error(error);
    }
});





export const uploadImages = async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        let urls = [];
        let files = req.files;
        if (files?.length > 0) {
            for (let file of files) {
                let {path} = file;
                let newPath = await uploader(path);
                urls.push(newPath);
                // fs.unlinkSync(path);
    
                console.log(file);
            }
        }
        let findBlog = await Blog.findByIdAndUpdate(id, {
            images: urls.map((file) =>  file.url)
        }, {new: true});
        res.json(findBlog);
    }
    catch (error) {
        throw new Error(error);
    }
}












