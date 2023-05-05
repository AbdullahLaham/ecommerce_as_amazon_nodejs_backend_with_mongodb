import express from 'express';

import { addToWishlist, createProduct, deleteProduct, getAProduct, getAllProducts, rating, updateProduct, uploadImages } from '../controller/ProductController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { productImageResize, uploadPhoto } from '../middlewares/uploadImages.js';
const router = express();

router.post('/create', authMiddleware, isAdmin, createProduct);

router.get('/:id', getAProduct);
router.get('/', getAllProducts);

router.put('/wishlist', authMiddleware, addToWishlist);

router.put('/rating', authMiddleware, rating);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImageResize, uploadImages);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);









export default router;