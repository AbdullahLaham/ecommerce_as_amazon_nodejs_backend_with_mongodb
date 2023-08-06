import ChatModel from "../models/ChatModel.js";
export const createChat = async (req, res) => {
    
    try {
        const {senderId, receiverId} = req.body;
        const newChat = new ChatModel({
            members: [senderId, receiverId],
        });
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error?.message});
    }
}

export const userChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({
            members: {$in: [req.params.userId]},
        }).populate('members');
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({message: error?.message});
    }
}


export const findChat = async (req, res) => {
    try {
        const chat = await ChatModel.findOne({
            members: {$all: [req.params.firstId, req.params.secondId]},
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({message: error?.message});
    }
}




