import { Types } from "mongoose";

export interface IFriendRequests {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  status: "pending" | "accepted" | "declined" | "cancelled" | "blocked";
}