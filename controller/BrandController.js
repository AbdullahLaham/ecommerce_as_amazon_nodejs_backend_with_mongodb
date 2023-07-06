// import Brand from '../models/CategoryModel.js';
import Brand from '../models/BrandModel.js'
import asyncHandler from 'express-async-handler';
import { validateMongoDBID } from '../utils/validateMongodbId.js';


export const createBrand = asyncHandler(async (req, res) => {
    try {
        let newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch  (error) {
        throw new Error(error);
    }
});

export const updateBrand  = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let updatedbBrand = await Brand.findByIdAndUpdate(id, req.body, {new: true});

        res.json(updatedbBrand);
    } catch  (error) {
        throw new Error(error);
    }
});

export const deleteBrand  = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let deletedBrand = await Brand.findByIdAndDelete(id);

        res.json(deletedBrand);
    }
    catch  (error) {
        throw new Error(error);
    }
});

export const getBrand  = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let brand = await Brand.findById(id);

        res.json(brand);
    }
    catch  (error) {
        throw new Error(error);
    }
});

export const getAllBrands = asyncHandler(async (req, res) => {

    try {
        let brands = await Brand.find();

        res.json(brands);
    }
    catch  (error) {
        throw new Error(error);
    }
});




