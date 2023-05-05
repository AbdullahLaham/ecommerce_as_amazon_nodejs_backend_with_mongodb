import Enquiry from '../models/enqModel.js';
import asyncHandler from 'express-async-handler';
import { validateMongoDBID } from '../utils/validateMongodbId.js';


export const createEnquiry = asyncHandler(async (req, res) => {
    try {
        let newEnquiry = await Enquiry.create(req.body);
        res.json(newEnquiry);
    } catch  (error) {
        throw new Error(error);
    }
});

export const updateEnquiry  = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {new: true});

        res.json(updatedEnquiry);
    } catch  (error) {
        throw new Error(error);
    }
});

export const deleteEnquiry  = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let deletedEnquiry = await Enquiry.findByIdAndDelete(id);

        res.json(deletedEnquiry);
    }
    catch  (error) {
        throw new Error(error);
    }
});

export const getEnquiry  = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let enquiry = await Enquiry.findById(id);

        res.json(enquiry);
    }
    catch  (error) {
        throw new Error(error);
    }
});

export const getAllEnquiries = asyncHandler(async (req, res) => {

    try {
        let enquiries = await Enquiry.find();

        res.json(enquiries);
    }
    catch  (error) {
        throw new Error(error);
    }
});




