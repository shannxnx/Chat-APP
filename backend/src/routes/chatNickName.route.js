import express from "express";
import { createNickNames } from "../controllers/chatNickName.controller.js";


const router = express.Router();

// router.get("/change-NickName", changeChatNn);
router.post("/create-NickName", createNickNames);



export default router;