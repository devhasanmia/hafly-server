import FriendRequest from "./friendRequest.model";
import { IAuthUser } from "../../interfaces/auth.interface";
import AppError from "../../errorHelpers/AppError";
import { StatusCode } from "../../utils/statusCode";

const sendFriendRequest = async (
  authenticatedUser: IAuthUser,
  receiverId: string
) => {
  try {
    const senderId = authenticatedUser.userId;
    if (receiverId === senderId) {
      throw new AppError(
        StatusCode.BadRequest,
        "Cannot send request to yourself"
      );
    }
    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverId,
    });

    if (existingRequest) {
      throw new AppError(StatusCode.BadRequest, "Friend request already sent");
    }
    const request = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });
    return request;
  } catch (error) {
    throw error;
  }
};

export const acceptFriendRequest = async (
  authenticatedUser: IAuthUser,
  requestId: string
) => {
  try {
    // Find the request where receiver = current authenticated user
    const request = await FriendRequest.findOne({
      _id: requestId,
      receiver: authenticatedUser.userId,
      status: "pending",
    });
    if (!request) {
      throw new AppError(StatusCode.Unauthorized, "Not found or unauthorized");
    }
    // Update request status
    request.status = "accepted";
    await request.save();
    return request;
  } catch (error) {
    throw error;
  }
};

export const declineFriendRequest = async (
  authenticatedUser: IAuthUser,
  requestId: string
) => {
  try {
    const request = await FriendRequest.findOne({
      _id: requestId,
      receiver: authenticatedUser.userId,
      status: "pending",
    });

    if (!request) {
      throw new AppError(StatusCode.Unauthorized, "Not found or unauthorized");
    }
    request.status = "declined";
    await request.save();
    return request;
  } catch (error) {
    throw error;
  }
};


export const cancelFriendRequest = async (
  authenticatedUser: IAuthUser,
  requestId: string
) => {
  try {
    const request = await FriendRequest.findOne({
      _id: requestId,
      sender: authenticatedUser.userId,
      status: "pending",
    });

    if (!request) {
      throw new AppError(StatusCode.Unauthorized, "Not found or unauthorized");
    }

    request.status = "cancelled";
    await request.save();

    return request;
  } catch (error) {
    throw error;
  }
};


export const getFriendRequests = async (authenticatedUser: IAuthUser) => {
  try {
    const requests = await FriendRequest.find({
      $or: [
        { receiver: authenticatedUser.userId },
        { sender: authenticatedUser.userId },
      ],
    })
      .populate("sender", "name email profile.profilePicture")
      .populate("receiver", "name email profile.profilePicture")
      .exec();
    return requests;
  } catch (error) {
    throw error;
  }
};

export const FriendRequestServices = {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  cancelFriendRequest,
  getFriendRequests
};
