import express from "express"
import { getMessages, sendMessage } from "../controllers/message.controller.js"
import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router();

router.get("/:receiverId", verifyToken, getMessages);
router.post("/:receiverId", verifyToken, sendMessage);

export default router;