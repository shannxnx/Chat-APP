import express from "express";
import { createNickNames, getNickNames } from "../controllers/chatNickName.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router = express.Router();


router.post("/create-NickName", protectRoute, createNickNames);
router.get("/get-NickName/:id", protectRoute, getNickNames)



export default router;