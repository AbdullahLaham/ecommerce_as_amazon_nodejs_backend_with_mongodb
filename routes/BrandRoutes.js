import express from 'express';

import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from '../controller/BrandController.js';
const router = express();

router.post('/', authMiddleware, isAdmin, createBrand);
router.put('/:id', authMiddleware, isAdmin, updateBrand);
router.delete('/:id', authMiddleware, isAdmin, deleteBrand);

router.get('/', getAllBrands);
router.get('/:id', getBrand);

export default router;
