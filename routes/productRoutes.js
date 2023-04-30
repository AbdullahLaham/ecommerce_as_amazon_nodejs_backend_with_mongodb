import express from 'express';

import { addToWishlist, createProduct, deleteProduct, getAProduct, getAllProducts, rating, updateProduct } from '../controller/ProductController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
const router = express();

router.post('/create', authMiddleware, isAdmin, createProduct);

router.get('/:id', getAProduct);
router.get('/', getAllProducts);

router.put('/wishlist', authMiddleware, addToWishlist);
router.put('/rating', authMiddleware, rating);
router.put('/:id', authMiddleware, isAdmin, updateProduct);

router.delete('/:id', authMiddleware, isAdmin, deleteProduct);









export default router;