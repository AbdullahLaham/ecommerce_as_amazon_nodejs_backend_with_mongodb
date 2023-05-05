import express from 'express';

import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { createBlog, deleteBlog, disLikeBlog, getAllBlogs, getBlog, likeBlog, updateBlog, uploadImages } from '../controller/BlogController.js';
import { blogImageResize, uploadPhoto } from '../middlewares/uploadImages.js';


const router = express();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/likes', authMiddleware, likeBlog);
router.put('/dislikes', authMiddleware, disLikeBlog);
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array("images", 2), blogImageResize, uploadImages);

router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/:id', getBlog);
router.get('/', getAllBlogs);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);
export default router;