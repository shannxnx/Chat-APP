import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { changeChatBg, getChatBg } from "../controllers/chatBg.controller.js";

const router = express.Router();


router.get("/get-ChatBg/:id", protectRoute, getChatBg);
router.post("/change-ChatBg/:id", protectRoute, changeChatBg);



export default router;