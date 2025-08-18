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

export const FriendRequestServices = {
    sendFriendRequest
};
