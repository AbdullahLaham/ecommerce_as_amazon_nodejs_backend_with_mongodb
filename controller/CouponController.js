import Coupon from '../models/CouponModel.js';
import asyncHandler from 'express-async-handler';
import { validateMongoDBID } from '../utils/validateMongodbId.js';

export const createCoupon = asyncHandler(async (req, res) => {
    try {
        let newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch  (error) {
        throw new Error(error);
    }
});


export const getAllCoupons = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    }
    catch  (error) {
        throw new Error(error);
    }
})

export const updateCoupon = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {new: true});

        res.json(updatedCoupon);
    } catch  (error) {
        throw new Error(error);
    }
});

export const deleteCoupon = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let deletedCoupon = await Coupon.findByIdAndDelete(id);

        res.json(deletedCoupon);
    }
    catch  (error) {
        throw new Error(error);
    }
});
