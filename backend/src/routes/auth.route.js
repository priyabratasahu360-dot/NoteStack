import { Router } from "express";
import passport from "passport";
import { signup, login, logout, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { generateTokenAndSetCookie } from "../utils/jwt.js";

const router = Router();

//---------- SIGNUP Route ----------//
router.post("/signup", signup);


//---------- LOGIN Route ----------//
router.post("/login", login);



//---------- Logout Route ----------//
router.post("/logout", logout);

//---------- Check User Route ----------//
router.get("/check", protectRoute, checkAuth);

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
}));

router.get("/google/callback", passport.authenticate("google", {session: false}), (req, res) => {
    const userId = req.user._id;
    console.log(req.user);
    const token = generateTokenAndSetCookie(userId, res);
    res.redirect(process.env.CLIENT_URL);
})

export default router;