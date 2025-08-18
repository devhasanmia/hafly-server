import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { FriendRequestServices } from "./friendRequest.service";
import { IAuthUser } from "../../interfaces/auth.interface";
import { sendResponse } from "../../utils/sendResponse";

const sendFriendRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user;
    const data = await FriendRequestServices.sendFriendRequest(
      authenticatedUser as IAuthUser,
      req.params.receiverId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Friend request has been sent",
      data,
    });
  }
);
const acceptFriendRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user;
    const { requestId } = req.params;
    const data = await FriendRequestServices.acceptFriendRequest(
      authenticatedUser as IAuthUser,
      requestId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Friend request has been accepted",
      data,
    });
  }
);


// Decline a friend request
const declineFriendRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user;
    const { requestId } = req.params;
    const data = await FriendRequestServices.declineFriendRequest(
      authenticatedUser as IAuthUser,
      requestId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Friend request declined successfully",
      data,
    });
  }
);


// Cancel a friend request
const cancelFriendRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user;
    const { requestId } = req.params;

    const data = await FriendRequestServices.cancelFriendRequest(
      authenticatedUser as IAuthUser,
      requestId
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Friend request cancelled successfully",
      data,
    });
  }
);


// Get all friend requests for a user
const getFriendRequests = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user;
    const data = await FriendRequestServices.getFriendRequests(
      authenticatedUser as IAuthUser
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Friend requests fetched successfully",
      data,
    });
  }
);




export const FriendRequestController = {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  cancelFriendRequest,
  getFriendRequests
}