import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { FriendRequestController } from "./friendRequest.controller";

const router = express.Router();

// send a friend request
router.post(
  "/:receiverId",
  checkAuth("user"),
  FriendRequestController.sendFriendRequest
);

// accept a friend request
router.patch(
  "/:requestId/accept",
  checkAuth("user"),
  FriendRequestController.acceptFriendRequest
);

// decline a friend request
router.patch(
  "/:requestId/decline",
  checkAuth("user"),
  FriendRequestController.declineFriendRequest
);

// cancel a friend request
router.patch(
  "/:requestId/cancel",
  checkAuth("user"),
  FriendRequestController.cancelFriendRequest
);

// get all friend requests for logged-in user
router.get(
  "/",
  checkAuth("user"),
  FriendRequestController.getFriendRequests
);

export const FriendRequestRoutes = router;
