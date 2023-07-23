import Product from '../models/ProductModel.js';
import User from '../models/UserModel.js';
import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import { validateMongoDBID } from '../utils/validateMongodbId.js';
import {cloudinaryUploadImg, cloudinaryDeleteImg} from '../utils/cloudinary.js';

import fs from 'fs';

export const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await new Product(req.body);
        newProduct.save();
        res.status(200).json(newProduct)
    } catch(error) {
        throw new Error(error);
    }
});

export const updateProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updatedProduct = await Product.findOneAndUpdate({id},
            req.body
        , {new: true});
        res.status(200).json(updatedProduct)
    } catch (error) {
        throw new Error(error);
    }
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    console.log('hello')
    try {
        // if (req.body.title) {
        //     req.body.slug = slugify(req.body.title);
        // }
        await Product.findByIdAndRemove(id);

        res.status(200).json({message: "delted successfully"});
    } catch (error) {
        throw new Error(error);
    }
});


export const getAProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
   
    try {
        const product = await Product.findById(id).populate('color');
        res.status(200).json(product)
    } catch(error) {
        throw new Error(error);
    }
});


export const getAllProducts = asyncHandler(async (req, res) => {
    console.log(req.query);
    // Filtering

    const queryObj = { ...req.query };
    const execludeFields = ['page', 'sort', 'limit', 'fields'];
    let queryObj2 = execludeFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));
    console.log(queryObj, queryObj2);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req?.query?.sort) {
        const sortBy = req?.query?.sort?.split(',').join(' ');
        query = query.sort(sortBy);

    } else {
        query = query.sort("createdAt");

    }

    // limiting the fields

    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    } else {
        // query = query.select('__v');
    }

    // pagination
    const page = req?.query?.page;
    const limit = req?.query?.limit;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) throw new Error("this page is not exists");
    }
    console.log(page, limit, skip);


    const product = await query;
    res.json(product);
    try {

        
        // const products = await Product.find(req.query);
        res.status(200).json(product);
    } catch(error) {
        throw new Error(error);
    }
});



export const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    console.log('hello ', _id)
    const {productId} = req.body;
    try {
        const user = await User.findById(_id);
        let isInWishlist = user.wishlist.find((id) => id.toString() === productId.toString());
        if (isInWishlist) {
            const user = await User.findByIdAndUpdate(_id, {
                $pull: {wishlist: productId}
            }, {new: true});
            res.json(user)

        } else {
            const user = await User.findByIdAndUpdate(_id, {
                $push: {wishlist: productId}
            }, {new: true});
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
})





export const rating =  asyncHandler(async (req, res) => {
    const {_id: userId} = req.user;
    const {prodId, rating: star, comment} = req.body;
    console.log(prodId, star, comment)
    try {
        const product = await Product.findById(prodId);
        console.log(product);
        let alreadyRated = product?.ratings.find((rating) => rating.postedBy.toString() == userId.toString());
        if (alreadyRated) {
            await Product.updateOne({
                ratings: {$elemMatch: alreadyRated}
            }, {
                $set : {"ratings.$.star": star, "ratings.$.comment": comment}
            }, {new: true});

        } else {
            await Product.findByIdAndUpdate(prodId, {
                $push : {ratings: {star, postedBy: userId, comment}}
            }, {new: true});
        }

        let getAllRatings = await Product.findById(prodId);
        let totalrating  = getAllRatings.ratings.length;
        let ratingssum = getAllRatings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingssum / totalrating);


        let ratedProduct = await Product.findByIdAndUpdate(prodId, {
            totalrating: actualRating
        }, {new: true});

        res.json(ratedProduct);

    } catch (error) {
        throw new Error(error);
    }
});



export const uploadImages = async (req, res) => {
    // const {id} = req.params;

    // validateMongoDBID(id);

    try {
        console.log("hello")
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        let urls = [];
        let files = req.files;
        console.log(files, 'ddddddddddd');
        for (let file of files) {
            let {path} = file;
            let newPath = await uploader(path);
            urls.push(newPath);
        }
        let images = urls.map((file) =>  file);
        console.log('imagesff44444444');

        // let findProduct = await Product.findByIdAndUpdate(id, {
        //     images: urls.map((file) =>  file.url)
        // }, {new: true});
        res.json(images);
    }
    catch (error) {
        throw new Error(error);
    }
}





export const deleteImages = async (req, res) => {
    // public_id of the image
    const {id} = req.params;
    try {
        const uploader = await cloudinaryDeleteImg(id, "images");
        console.log(uploader)
        res.json({message: "Deleted"});
    }
    catch (error) {
        throw new Error(error);
    }
}


