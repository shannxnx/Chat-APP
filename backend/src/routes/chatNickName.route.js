import express from "express";
import { createNickNames, getNickNames, updatePartnerNickName, updateUserNickName } from "../controllers/chatNickName.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router = express.Router();


router.post("/create-NickName", protectRoute, createNickNames);
router.get("/get-NickName/:id", protectRoute, getNickNames);
router.post("/update-PartnerNickName", protectRoute, updatePartnerNickName);
router.post("/update-UserNickName", protectRoute, updateUserNickName);




export default router;