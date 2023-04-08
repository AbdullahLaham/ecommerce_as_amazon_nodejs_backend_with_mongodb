import express from 'express';
import { blockUser, createUser, deleteUser, getAllUsers, getUser, loginUser, unblockUser, updateUser } from '../controller/UserController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/all-users',authMiddleware, isAdmin ,  getAllUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id',authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)

export default router;