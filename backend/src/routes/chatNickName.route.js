import express from "express";
import { createNickNames } from "../controllers/chatNickName.controller.js";


const router = express.Router();


router.post("/create-NickName", createNickNames);



export default router;