import { generateToken } from '../config/jwtToken.js';
import User from '../models/UserModel.js';
import asyncHandler from 'express-async-handler';

export const createUser = asyncHandler(async (req, res) => {
    const {email, password, firstname, lastname, } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
        try {  
            // create user 
            const newUser = await new User(req.body);
            newUser.save();
            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).json({message: error.message, sucess: false}, );
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
    const user = await User.findOne({email});
    const {password, ...otherData} = user._doc;
    console.log(otherData);
    if (user?.email && user.isPasswordMatched(password)) {
        res.status(200).json({...otherData, token: generateToken(user?._id, )});
    } else {
        throw new Error("Invalid Credentials");
    }
});

// update User
export const updateUser = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const user = await User.findById(_id);
    let userdata = req.body;
    // const newUser = {...user?._doc, userdata};
    // console.log(newUser);
    const {firstname, lastname, email, mobile} = req.body ;
    try {

        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname,
            lastname,
            email,
            mobile,
        }, {new: true});
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({message: error.message, sucess: false}, );
    }

});


// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
     
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message, sucess: false}, );
    }

})

// Get a single user
export const getUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    console.log(id);
    try {
        
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({message: error.message, sucess: false}, );
    }

})
// delete a User
export const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    console.log(id);
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({message: error.message, sucess: false}, );
    }

})




// block user
export const blockUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, {
            isBlocked: true,

        }, {new :true,});
        res.status(200).json({message: "User is Blocked"});
    }
    catch (error) {
        res.status(500).json({message: error.message, sucess: false}, );
    }

})
// unblock user
export const unblockUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    console.log(id);
    try {
        const user = await User.findByIdAndUpdate(id, {
            isBlocked: false,

        }, {new :true,});
        res.status(200).json({message: "User is UnBlocked"});
    }
    catch (error) {
        res.status(500).json({message: error.message, sucess: false}, );
    }

})
