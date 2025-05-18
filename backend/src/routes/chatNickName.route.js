import express from "express";
import { changeChatNn } from "../controllers/chatNickName.controller.js";


const router = express.Router();

router.get("/change-NickName", changeChatNn);


export default router;