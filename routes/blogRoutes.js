import express from 'express';

import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { createBlog, deleteBlog, disLikeBlog, getAllBlogs, getBlog, likeBlog, updateBlog } from '../controller/BlogController.js';
const router = express();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/likes', authMiddleware, likeBlog);
router.put('/dislikes', authMiddleware, disLikeBlog);

router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/:id', getBlog);
router.get('/', getAllBlogs);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);
export default router;