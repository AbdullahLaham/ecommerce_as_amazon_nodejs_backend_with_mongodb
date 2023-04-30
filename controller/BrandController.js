// import Category from '../models/CategoryModel.js';
import Brand from '../models/BrandModel.js'
import asyncHandler from 'express-async-handler';
import { validateMongoDBID } from '../utils/validateMongodbId.js';


export const createBrand = asyncHandler(async (req, res) => {
    try {
        let newCategory = await Brand.create(req.body);
        res.json(newCategory);
    } catch  (error) {
        throw new Error(error);
    }
});

export const updateBrand  = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let updatedCategory = await Brand.findByIdAndUpdate(id, req.body, {new: true});

        res.json(updatedCategory);
    } catch  (error) {
        throw new Error(error);
    }
});

export const deleteBrand  = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let deletedCategory = await Brand.findByIdAndDelete(id);

        res.json(deletedCategory);
    }
    catch  (error) {
        throw new Error(error);
    }
});

export const getBrand  = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let category = await Brand.findById(id);

        res.json(category);
    }
    catch  (error) {
        throw new Error(error);
    }
});

export const getAllBrands = asyncHandler(async (req, res) => {

    try {
        let categories = await Brand.find();

        res.json(categories);
    }
    catch  (error) {
        throw new Error(error);
    }
});




