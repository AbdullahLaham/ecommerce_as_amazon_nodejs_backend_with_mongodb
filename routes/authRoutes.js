import express from 'express';
import { blockUser, createUser, deleteUser, forgotPasswordToken, getAllUsers, getUser, handleRefreshToken, loginUser, logout, resetPassword, unblockUser, updatePassword, updateUser } from '../controller/UserController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.post('/reset-password/:token', resetPassword)
router.get('/all-users',authMiddleware, isAdmin ,  getAllUsers);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);

router.put('/password', authMiddleware, updatePassword);

router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id',authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)
export default router;