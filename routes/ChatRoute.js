import express from 'express';
import { createChat, findChat, userChats } from '../controller/ChatController.js';

// import { loginUser, signup, logoutUser } from '../Controllers/AuthController.js';


const router = express.Router();


router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);







export default router;