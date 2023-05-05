import Color from '../models/ColorModel.js';
import asyncHandler from 'express-async-handler';
import { validateMongoDBID } from '../utils/validateMongodbId.js';


export const createColor = asyncHandler(async (req, res) => {
    try {
        let newcolor = await Color.create(req.body);
        res.json(newcolor);
    } catch  (error) {
        throw new Error(error);
    }
});

export const updateColor  = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let updatedcolor = await Color.findByIdAndUpdate(id, req.body, {new: true});

        res.json(updatedcolor);
    } catch  (error) {
        throw new Error(error);
    }
});

export const deleteColor  = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let deletedColor = await Color.findByIdAndDelete(id);

        res.json(deletedColor);
    }
    catch  (error) {
        throw new Error(error);
    }
});

export const getColor  = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let color = await Color.findById(id);

        res.json(color);
    }
    catch  (error) {
        throw new Error(error);
    }
});

export const getAllColors = asyncHandler(async (req, res) => {

    try {
        let colors = await Color.find();

        res.json(colors);
    }
    catch  (error) {
        throw new Error(error);
    }
});




