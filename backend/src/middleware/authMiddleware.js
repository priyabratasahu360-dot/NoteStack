import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async(req, res, next) => {
    const token = req.cookies.jwt; //cookie name - jwt

    if(!token){
        return res.status(401).json({message: "Unauthorized access"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if(!decoded){
        return res.status(200).json({message: "No token provided || Token expired"});
    }

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;

    next();
}