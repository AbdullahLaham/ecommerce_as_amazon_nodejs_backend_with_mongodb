import express from 'express';
import { applyCoupon, blockUser, createOrder, createUser, deleteCartItem, deleteUser, emptyCart, forgotPasswordToken, getAllUsers, getAnOrder, getMonthwiseOrderCount, getMonthwiseOrderIncome, getOrders, getUser, getUserCart, getUserOrders, getWishlist, handleRefreshToken, loginAdminUser, loginUser, logout, resetPassword, saveAddress, unblockUser, updateCartItem, updateOrderStatus, updatePassword, updateUser, userCart, getYearlyTotalOrders, getAdminUsers } from '../controller/UserController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/admin-login', loginAdminUser);
router.post('/cart', authMiddleware, userCart);
router.post('/cart/create-order', authMiddleware, createOrder);
router.post('/forgot-password-token', forgotPasswordToken);
router.get('/getMonthwiseOrderIncome', getMonthwiseOrderIncome);
router.get('/getMonthwiseOrderCount', getMonthwiseOrderCount);
router.get('/getYearlyTotalOrders', getYearlyTotalOrders);
// router.post('/cart/applycoupon', authMiddleware, applyCoupon);


router.post('/order/create-order', authMiddleware, createOrder)


router.get('/wishlist', authMiddleware, getWishlist);
router.get('/cart', authMiddleware, getUserCart);
router.get('/order/:id', authMiddleware, getAnOrder);

// router.get('/get-orders/:id', authMiddleware, getUserOrders);
router.get('/all-users',authMiddleware, isAdmin ,  getAllUsers);
router.get('/admin-users',authMiddleware ,  getAdminUsers);

router.get('/refresh', handleRefreshToken);
router.get('/:id', getUser);

router.post('/logout', logout);

router.put('/reset-password/:token', resetPassword);
router.put('/reset-password', authMiddleware, updatePassword);

// router.delete('/empty-cart', authMiddleware, emptyCart);
router.put('/edit-user',authMiddleware, updateUser);
router.put('/save-address', authMiddleware, saveAddress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
router.put('/cart/:id', authMiddleware, updateCartItem);
router.put('/order/update-order/:id', authMiddleware, isAdmin, updateOrderStatus);

router.delete('/cart/:id', authMiddleware, deleteCartItem);
router.delete('/:id', deleteUser);


export default router;