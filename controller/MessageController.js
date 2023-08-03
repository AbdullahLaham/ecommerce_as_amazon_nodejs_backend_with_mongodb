import MessageModel from "../models/MessageModel.js";

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const addMessage = async (req, res) => {
    
    

    try {
        const {chatId, senderId, text} = req.body;
        const message = new MessageModel({
            chatId,
            senderId,
            text,
        });
        const result = await message.save();
        res.status(200).json(result);

    } catch(error) {
        res.status(500).json({message: error?.message});

    }
    
}

export const getMessages = async (req, res) => {
    
    const {chatId} = req.params;

    try {
        const result = await MessageModel.find({chatId});
        res.status(200).json(result);
        
    } catch(error) {
        res.status(500).json({message: error?.message});

    }
    
}
