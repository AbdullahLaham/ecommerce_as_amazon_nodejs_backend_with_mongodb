import Category from '../models/CategoryModel.js';
import asyncHandler from 'express-async-handler';
import { validateMongoDBID } from '../utils/validateMongodbId.js';


export const createCategory = asyncHandler(async (req, res) => {
    try {
        let newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch  (error) {
        throw new Error(error);
    }
});

export const updateCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let updatedCategory = await Category.findByIdAndUpdate(id, req.body, {new: true});

        res.json(updatedCategory);
    } catch  (error) {
        throw new Error(error);
    }
});

export const deleteCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let deletedCategory = await Category.findByIdAndDelete(id);

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
        let category = await Category.findById(id);

        res.json(category);
    }
    catch  (error) {
        throw new Error(error);
    }
});

export const getAllCategories = asyncHandler(async (req, res) => {

    try {
        let categories = await Category.find();

        res.json(categories);
    }
    catch  (error) {
        throw new Error(error);
    }
});







