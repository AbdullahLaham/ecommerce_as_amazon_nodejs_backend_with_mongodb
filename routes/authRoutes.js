import express from 'express';
import { applyCoupon, blockUser, createOrder, createUser, deleteUser, emptyCart, forgotPasswordToken, getAllUsers, getOrders, getUser, getUserCart, getUserOrders, getWishlist, handleRefreshToken, loginAdminUser, loginUser, logout, resetPassword, saveAddress, unblockUser, updateOrderStatus, updatePassword, updateUser, userCart } from '../controller/UserController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/admin-login', loginAdminUser);

router.post('/forgot-password-token', forgotPasswordToken);
router.post('/reset-password/:token', resetPassword);
router.post('/cart', authMiddleware, userCart);
router.post('/cart/applycoupon', authMiddleware, applyCoupon);
router.post('/cart/cash-order', authMiddleware, createOrder)


router.get('/wishlist', authMiddleware, getWishlist);
router.get('/cart', authMiddleware, getUserCart);
router.get('/get-orders', authMiddleware, getOrders);
router.get('/get-orders/:id', authMiddleware, getUserOrders);
router.get('/all-users',authMiddleware, isAdmin ,  getAllUsers);
router.get('/refresh', handleRefreshToken);
router.get('/:id', getUser);

router.post('/logout', logout);



router.put('/reset-password', authMiddleware, updatePassword);
router.delete('/empty-cart', authMiddleware, emptyCart);
router.delete('/:id', deleteUser);
router.put('/edit-user',authMiddleware, updateUser);
router.put('/save-address', authMiddleware, saveAddress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);

router.put('/order/update-order/:id', authMiddleware, isAdmin, updateOrderStatus);


export default router;