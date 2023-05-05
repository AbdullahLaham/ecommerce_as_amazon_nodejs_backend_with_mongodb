import express from 'express';

import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { createColor, deleteColor, getAllColors, getColor, updateColor } from '../controller/ColorController.js';
const router = express();

router.post('/', authMiddleware, isAdmin, createColor);
router.put('/:id', authMiddleware, isAdmin, updateColor);
router.delete('/:id', authMiddleware, isAdmin, deleteColor);

router.get('/', getAllColors);
router.get('/:id', getColor);

export default router;
