import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "cloudinary";

export const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getting users for sidebar", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const getMessages = async (req,res) => {                 //YE SAMAJHNA HAII
    try {
        const { id:UserToChatId } =req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:UserToChatId},
                {senderId:UserToChatId,receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        
    }
}

export const sendMessage = async (req,res ) => {
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId =req.user._id;

        let imageUrl
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message ({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save() ;

        //Real-time functionality goes here => socket.io
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sending message", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
