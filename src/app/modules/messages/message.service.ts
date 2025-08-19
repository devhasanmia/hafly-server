import { Types } from "mongoose";
import { Message } from "./message.model";
import { IMessage } from "./message.interface";
import { IAuthUser } from "../../interfaces/auth.interface";
import { getReceiverSocketIds, io } from "../../config/socket";


const createMessage = async (authenticatedUser: IAuthUser, payload: IMessage) => {
    try {
        // sender কে ObjectId তে convert
        payload.sender = new Types.ObjectId(authenticatedUser.userId);
        const result = await Message.create(payload);
        // 🔥 Socket.IO: receiver কে push করা
        const receiverSocketIds = getReceiverSocketIds(payload.receiver.toString());
        receiverSocketIds.forEach((socketId) => {
            io.to(socketId).emit("newMessage", result);
        });
        return result;
    } catch (error) {
        throw error;
    }
};

const getMessages = async (sender: string, receiver: string) => {
  try {
    const result = await Message.find({
      $or: [
        {
          sender: new Types.ObjectId(sender),
          receiver: new Types.ObjectId(receiver),
        },
        {
          sender: new Types.ObjectId(receiver),
          receiver: new Types.ObjectId(sender),
        },
      ],
    })
      .populate("sender", "-password")
      .populate("receiver", "-password")
      .sort({ createdAt: 1 });

    return result;
  } catch (error) {
    throw error;
  }
};

export const MessageServices = {
    createMessage,
    getMessages,
};
