import express from 'express';

import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { createCoupon, deleteCoupon, getAllCoupons, updateCoupon, getCoupon } from '../controller/CouponController.js';
const router = express();

router.post('/', authMiddleware, isAdmin, createCoupon);
router.put('/:id', authMiddleware, isAdmin, updateCoupon);
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon);

router.get('/', authMiddleware, isAdmin, getAllCoupons);
router.get('/:id', getCoupon);

export default router;
