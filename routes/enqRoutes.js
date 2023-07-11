import express from 'express';

import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { createEnquiry, deleteEnquiry, getAllEnquiries, getEnquiry, updateEnquiry } from '../controller/EnquiryController.js';
const router = express();

router.post('/', authMiddleware, createEnquiry);
router.put('/:id', authMiddleware, updateEnquiry);
router.delete('/:id', authMiddleware, isAdmin, deleteEnquiry);

router.get('/', authMiddleware, isAdmin, getAllEnquiries);
router.get('/:id', getEnquiry);

export default router;
