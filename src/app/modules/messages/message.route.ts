import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { MessageController } from "./message.controller";


const router = express.Router();

router.post("/", checkAuth("user"), MessageController.createMessage);
router.get("/:receiverId", checkAuth("user"), MessageController.getMessages);

export const MessageRoutes = router;
