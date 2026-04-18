import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";

import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.patch("/update-profile",protectRoute, updateProfile);

export default router;