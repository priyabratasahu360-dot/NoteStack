import { Router } from "express";
import { signup, login, logout, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

//---------- SIGNUP Route ----------//
router.post("/signup", signup);


//---------- LOGIN Route ----------//
router.post("/login", login);



//---------- Logout Route ----------//
router.post("/logout", logout);

//---------- Check User Route ----------//
router.get("/check", protectRoute, checkAuth);

export default router;