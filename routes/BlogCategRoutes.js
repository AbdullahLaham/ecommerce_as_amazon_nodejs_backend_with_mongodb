import express from 'express';

import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from '../controller/BlogCategController.js';
const router = express();

router.post('/', authMiddleware, isAdmin, createCategory);
router.put('/:id', authMiddleware, isAdmin, updateCategory);
router.delete('/:id', authMiddleware, isAdmin, deleteCategory);

router.get('/', getAllCategories);
router.get('/:id', getCategory);

export default router;
