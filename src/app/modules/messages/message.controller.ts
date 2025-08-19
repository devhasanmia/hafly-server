import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { IAuthUser } from "../../interfaces/auth.interface";
import { MessageServices } from "./message.service";
import { sendResponse } from "../../utils/sendResponse";
import { IMessage } from "./message.interface";
import { Types } from "mongoose";


// POST /messages
const createMessage = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const authenticatedUser = req.user as IAuthUser;
        const payload = req.body;
        const data = await MessageServices.createMessage(authenticatedUser, payload as IMessage);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Message sent successfully",
            data,
        });
    }
);

// GET /messages/:receiverId
const getMessages = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authenticatedUser = req.user as IAuthUser;
  const { receiverId } = req.params;

  const data = await MessageServices.getMessages(authenticatedUser.userId, receiverId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Messages fetched successfully",
    data,
  });
});

export const MessageController = {
    createMessage,
    getMessages,
};
