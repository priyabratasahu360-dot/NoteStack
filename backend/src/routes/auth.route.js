import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = Router();

//---------- SIGNUP Route ----------//
router.post("/signup", signup);


//---------- LOGIN Route ----------//
router.post("/login", login);



//---------- Logout Route ----------//
router.delete("/logout", logout);

export default router;