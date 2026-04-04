import User from "../models/User.js";
import { bcryptPassword } from "../utils/hash.js";
import {generateTokenAndSetCookie} from "../utils/jwt.js"

//---------- SIGNUP Controller ----------//
export const signup = async (req, res) => {
  const { userName, email, password } = req.body;

  // Basic validation before creating user
  if(!userName || !email || !password){
    return res.status(400).json({message: "All fields required"});
  }

  if(userName.length < 6){
    return res.status(400).json({message: "Please use a valid username with minimum 6 character"});
  }

  if(password.length < 8){
    return res.status(400).json({message: "Password length is too short"});
  }
  try {
    const formattedEmail = email.toLowerCase().trim();
    // Check DB if user already exist
    const existingUser = await User.findOne({ email: formattedEmail });

    if (existingUser) {
      return res.status(400).json({message: "User already exist"});
    }

    // If user doesn't exist convert plain password to bcrypted password  
    const hashedPassword = await bcryptPassword(password);

    // Create new user in database with pre defined Schema make sure save hashed password inside database
    const newUser = new User({
      userName,
      email: formattedEmail,
      password: hashedPassword,
    });

    // If creating new user is success then we generate a token which will be stored inside cookie 
    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);
    
    res.status(201).json({
        message: "Account created",
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      });

  } catch (error) {
    console.log("Error in Signup Controller", error.message);
    return res.status(500).json({message: "Internal Server Error"});
  }
};

//---------- LOGIN Controller ----------//
export const login = async (req, res) => {
  return res.json("login route");
};

//---------- LOGOUT Controller ----------//
export const logout = async (req, res) => {
  return res.json("logout route");
};
