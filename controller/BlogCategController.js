import BlogCategory from "../models/BlogCategModel.js";
import asyncHandler from 'express-async-handler';
import { validateMongoDBID } from '../utils/validateMongodbId.js';


export const createCategory = asyncHandler(async (req, res) => {
    try {
        let newCategory = await BlogCategory.create(req.body);
        res.json(newCategory);
    } catch  (error) {
        throw new Error(error);
    }
});

export const updateCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let updatedCategory = await BlogCategory.findByIdAndUpdate(id, req.body, {new: true});

        res.json(updatedCategory);
    } catch  (error) {
        throw new Error(error);
    }
});

export const deleteCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let deletedCategory = await BlogCategory.findByIdAndDelete(id);

        res.json(deletedCategory);
    }
    catch  (error) {
        throw new Error(error);
    }
});

export const getCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let category = await BlogCategory.findById(id);

        res.json(category);
    }
    catch  (error) {
        throw new Error(error);
    }
});

export const getAllCategories = asyncHandler(async (req, res) => {

    try {
        let categories = await BlogCategory.find();

        res.json(categories);
    }
    catch  (error) {
        throw new Error(error);
    }
});



