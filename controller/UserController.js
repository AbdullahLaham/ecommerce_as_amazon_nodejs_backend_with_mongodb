import { generateToken } from '../config/jwtToken.js';
import User from '../models/UserModel.js';
import Cart from '../models/CartModel.js';
import Product from '../models/ProductModel.js';
import Coupon from '../models/CouponModel.js';
import Order from '../models/OrderModel.js';
import asyncHandler from 'express-async-handler';
import { validateMongoDBID } from '../utils/validateMongodbId.js';
import { generateNewToken } from '../utils/refreshtoken.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from './EmailController.js';
import uniqid from 'uniqid';


export const createUser = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
        try {
            // create user 
            const newUser = await new User(req.body);
            newUser.save();
            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message, sucess: false },);
        }
    } else {
        // user Already exists
        throw new Error("user Already exists");
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(email);

    // check if user exists or not
    const user = await User.findOne({ email });
    const token = generateNewToken(user?._id);
console.log(user._doc)
    const updatedUser = await User.findByIdAndUpdate(user?._id, {
        refreshToken: token,
    }, { new: true, });


    res.cookie("refreshToken", token, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
    });


    
    const { password, ...otherData } = user?._doc;
    console.log(otherData);
    if (user?.email && user.isPasswordMatched(password)) {
        res.status(200).json({ ...otherData, token: generateToken(user?._id,) });
    } else {
        throw new Error("Invalid Credentials");
    }
});






export const loginAdminUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(req.body);

    // check if user exists or not
    const user = await User.findOne({ email });
    console.log(user)
    if (user?.role !== 'admin') throw new Error("You are not authorized, you are not an admin");
    const token = generateNewToken(user?._id);

    const updatedUser = await User.findByIdAndUpdate(user?._id, {
        refreshToken: token,
    }, { new: true, });

    res.cookie("refreshToken", token, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
    })
    const { password, ...otherData } = user?._doc;
    console.log(otherData);
    if (user?.email && user.isPasswordMatched(password)) {
        res.status(200).json({ ...otherData, token: generateToken(user?._id,) });
    } else {
        throw new Error("Invalid Credentials");
    }
});






// landle refresh token 

export const handleRefreshToken = asyncHandler(async (req, res) => {
    try {

        const cookie = req.cookies;
        // console.log(cookie);
        if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
        const refreshToken = cookie.refreshToken;
        // console.log(refreshToken);
        const user = await User.findOne({ refreshToken });
        if (!user) throw new Error("No refresh token present in DB or not matched");
        jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            console.log(decoded?.id, user._id);

            if (err || decoded?.id !== String(user._id)) {
                throw new Error("Something error in refresh token");
            } else {
                const accessToken = generateToken(user?._id);
                res.json({ accessToken });
            }
        });

        // const newUser = await new User(req.body);
        // newUser.save();
        // res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
});

// logout functionality
export const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    // console.log(cookie);
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        res.sendStatus(204)
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: "",
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204)
})

// update User
export const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id);
    let userdata = req.body;
    // const newUser = {...user?._doc, userdata};
    // console.log(newUser);
    const { firstname, lastname, email, mobile } = req.body;
    try {

        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname,
            lastname,
            email,
            mobile,
        }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }

});




// save user Address

export const saveAddress = asyncHandler(async (req, res, next) => {
    const {_id} = req.user;
    validateMongoDBID(_id);
    try {
        let updatedUser = await User.findByIdAndUpdate(_id, {
            address: req?.body?.address,
        }, {new: true});
        res.json(updatedUser);
    } 
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }

});



// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {

    try {
        const users = await User.find().populate('wishlist');;
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }

})

// Get a single user
export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBID(id);
    console.log(id);
    try {

        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }

})
// delete a User
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBID(id);
    console.log(id);
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }

})




// block user
export const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBID(id);
    try {
        const user = await User.findByIdAndUpdate(id, {
            isBlocked: true,

        }, { new: true, });
        res.status(200).json({ message: "User is Blocked" });
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }

})
// unblock user
export const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBID(id)
    console.log(id);
    try {
        const user = await User.findByIdAndUpdate(id, {
            isBlocked: false,

        }, { new: true, });
        res.status(200).json({ message: "User is UnBlocked" });
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }

});



// change password



export const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDBID(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    } else {
        res.json("user");
    }
});


// forgot password

export const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
        throw new Error("there is no user with this email ")
    } else {
        try {
            const token = await user.createPasswordResetToken();
            await user.save();
            const resetURL = `Hi, follow this link to reset your password. this link is valid till 10 miutes from now. <a href="http://localhost:5000/user/reset-password/${token}">Click Here</a>`
            const data = {
                to: email,
                text: "Hey User",
                subject: 'forgot password link',
                html: resetURL,
            }
            sendEmail(data);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message, sucess: false },);
        }
    }
});

export const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.Now() } // token is not expired till now
    });
    if (!user) throw new Error("Token Expired, Please try again later");
    user.password = password;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    res.json(user);

});



// get user wishlist

export const getWishlist = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongoDBID(_id)
    
    try {
        const user = await User.findById(_id).populate('wishlist');
        console.log(user);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
});


// user cart

export const userCart = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const {productId, color, quantity, price} = req.body;

    validateMongoDBID(_id)
    
    try {
        let products = [];
        const user = await User.findById(_id);
        // check if user already added to his cart
        // let alreadyExistsCart = await Cart.findOne({orderBy: user._id});
        // if (!alreadyExistsCart) {
        //     let newCart = await Cart.create(cart);

        //     let updatedUser = await User.findByIdAndUpdate(_id, {
        //         cart,
        //     }, {new: true});
        //     res.json(updatedUser);
        // } else {
        //     let updatedCart = await alreadyExistsCart.updateOne({
        //         $push: {products: [...cart]}
        //     });
            
        //     let updatedUser = await User.findByIdAndUpdate(_id, {
        //         // cart: 
        //     }, {new: true});
        //     res.json(updatedUser);
        // }
        
        let newCart = await new Cart({
            userId: _id,
            productId,
            color,
            price,
            quantity,
        }).save();
        await User.findByIdAndUpdate(_id, {
            cart: newCart?._id
        }, {new: true});
        
        res.json(newCart);

    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
});




export const getUserCart = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongoDBID(_id)
    
    try {
        const cart = await Cart.findOne({orderBy: _id}).populate('products.product');

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
})



export const emptyCart = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongoDBID(_id)
    
    try {
        const deletedCart = await Cart.findOneAndRemove({orderBy: _id});
        res.json(deletedCart);
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
});



export const applyCoupon = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongoDBID(_id)
    const {coupon} = req.body;
    const validCoupon = await Coupon.findOne({name: coupon});
    console.log(validCoupon);
    if (validCoupon === null) {
        throw new Error("Invalid Coupon");
    }
    let user = await User.findById(_id);
    
    try {
        const cart = await Cart.findOne({orderBy: _id});

        await cart.updateOne({
            totalAfterDiscount: cart?.cartTotal - (cart?.cartTotal * validCoupon?.discount / 100).toFixed(2)
        });

        res.json(cart?.totalAfterDiscount);
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
});



export const createOrder = asyncHandler(async (req, res) => {
    
    const {COD, couponApplied} = req.body;
    const {_id} = req.user;
    validateMongoDBID(_id);
    

    try {
        if (!COD) throw new Error("create cash order failed");
        let user = await User.findById(_id);
        let userCart = await Cart.findOne({orderBy: _id});
        let finalAmount = 0;
        if (couponApplied && userCart?.totalAfterDiscount) {
            finalAmount = userCart.totalAfterDiscount * 100;
        } else {
            finalAmount = userCart.cartTotal * 100;
        }
        
        
        let newOrder = await new Order({
            products: userCart?.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finalAmount,
                status: "Cash On Delivery",
                created: Date.now(),
                currency: "usd",
            },
            orderBy: user?._id,
            orderStatus: "Cash On Delivery",
        }).save();
        // updateOne updates a single document in the collection that matches the filter. If multiple documents match, updateOne will update the first matching document only.
        
        // visit this link    https://www.mongodb.com/docs/manual/reference/method/db.collection.bulkWrite/;
        let update = userCart.products.map( (item) => {
            // let product = await Product.findById(item.product._id);

            // if (item?.count > product?.quantity) {
            //     throw new Error(`your cart contains quantity of the product ${product?.title} more than the available in the stock`)
            // }
            return {
                updateOne: {
                    filter: {_id: item.product._id},
                    update: { $inc: {quantity: -item?.count, sold: +item.count} }
                }
            }
        });
        console.log(update, 'fffffffff');

        let updated = await Product.bulkWrite(update, {});
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
});





export const getOrders = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongoDBID(_id);
    try {
        let order = await Order.find({orderBy: _id}).populate("products.product").populate('orderBy');
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
});



export const getAllOrders = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongoDBID(_id);
    try {
        let order = await Order.find({orderBy: _id}).populate("products.product").populate('orderBy');
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
});

export const getUserOrders = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBID(id);
    try {
        let order = await Order.findById(id).populate("products.product").populate('orderBy');
        console.log(order, 'uu')
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
});




export const updateOrderStatus = asyncHandler(async (req, res) => {
    let {_id} = req.user;
    let {id} = req.params;
    let {status} = req.body;

    validateMongoDBID(_id);

    try {
        let order = await Order.findById(id);
        
        let updatedOrder = await Order.findByIdAndUpdate(id, {
            orderStatus: status,
            paymentIntent: {
                ...order?.paymentIntent,
                status,
            }
        }, {new :true});

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
});




