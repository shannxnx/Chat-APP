//this is the route

import express from "express";
import { signup, login, logout, updateProfile, checkAuth, getUserInfo, getAllUsers, 
updateNickName } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);
router.get("/userInfo", protectRoute, getUserInfo);
router.get("/all-users", protectRoute, getAllUsers);

//--------TEST-----------
router.post("/set-NickName", protectRoute, updateNickName);



export default router;