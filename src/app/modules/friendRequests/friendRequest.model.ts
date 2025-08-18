import { Schema, model } from "mongoose";
import { IFriendRequests } from "./friendRequest.interface";

const friendRequestSchema = new Schema<IFriendRequests>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "cancelled", "blocked"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FriendRequest = model<IFriendRequests>(
  "FriendRequest",
  friendRequestSchema
);

export default FriendRequest;
