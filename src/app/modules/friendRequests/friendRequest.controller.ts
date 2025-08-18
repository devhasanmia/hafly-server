import { NextFunction, Request, Response } from "express";
import FriendRequest from "./friendRequest.model";
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


// Accept a friend request
export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;

    const request = await FriendRequest.findByIdAndUpdate(
      requestId,
      { status: "accepted" },
      { new: true }
    );

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Decline a friend request
export const declineFriendRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;

    const request = await FriendRequest.findByIdAndUpdate(
      requestId,
      { status: "declined" },
      { new: true }
    );

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Cancel a friend request
export const cancelFriendRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    const userId = req.user.userId;

    const request = await FriendRequest.findOneAndUpdate(
      { _id: requestId, sender: userId },
      { status: "cancelled" },
      { new: true }
    );

    if (!request)
      return res
        .status(404)
        .json({ message: "Request not found or not authorized" });

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get all friend requests for a user
export const getFriendRequests = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const requests = await FriendRequest.find({
      receiver: userId,
      status: "pending",
    })
      .populate("sender", "name email") // populate sender info
      .exec();

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};



export const FriendRequestController = {
    sendFriendRequest
}