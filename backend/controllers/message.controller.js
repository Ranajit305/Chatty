import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../db/cloudinary.js"
import { getReceiverSocketId, io } from "../utils/socket.js";
import Group from "../models/group.model.js";

export const getMessages = async (req, res) => {
    try {
        const { chatType } = req.query;
        const { receiverId } = req.params;
        const  senderId  = req.user._id;

        let messages = null;

        if (chatType === 'contact') {
          messages = await Message.find({
            $or: [
              { senderId: senderId, receiverId: receiverId },
              { senderId: receiverId, receiverId: senderId }
            ]
          }).populate({path: 'senderId', select: 'profilePic'})
        } else {
          messages = await Message.find({ receiverId }).populate({ path: 'senderId', select: 'profilePic' })
        }
        
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const sendMessage = async (req, res) => {
    try {
      const { text, image, chatType } = req.body;
      const { receiverId } = req.params;
      const senderId = req.user._id;

      const receiverUser = await User.findById(receiverId);
      const senderUser = await User.findOne(senderId);
  
      let imageUrl;
      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      })

      if (chatType === 'contact') {
        if (senderUser.contacts.includes(receiverId) && receiverUser.contacts.includes(senderId)) {

        } else {
          if (!senderUser.contacts.includes(receiverId) && !receiverUser.dm.includes(senderId)) {
            senderUser.contacts.push(receiverId);
            receiverUser.dm.push(senderId);
            if (senderUser.dm.includes(receiverId) && receiverUser.dm.includes(senderId)) {
              senderUser.dm.pull(receiverId);
              receiverUser.dm.pull(senderId);
              senderUser.groupContacts.push(receiverId);
              receiverUser.groupContacts.push(senderId);
            }
          }
        }
  
        await Promise.all([
          receiverUser.save(),
          senderUser.save(),
          newMessage.save()
        ]);
        const message = await Message.findById(newMessage._id).populate({path: 'senderId', select: 'profilePic'})
        res.status(200).json(message)
  
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('newMessage', message);
        }
      } else {
        const group = await Group.findById(receiverId);
        group.messages.push(newMessage._id);
        await Promise.all([
          group.save(),
          newMessage.save()
        ]);
        const message = await Message.findById(newMessage._id).populate({path: 'senderId', select: 'profilePic'})
        res.status(200).json(message)
        io.to(receiverId).emit('newGroupMessage', message);
      }
    } catch (error) {
      res.status(500).json({success: false, message: error.message});
    }
}