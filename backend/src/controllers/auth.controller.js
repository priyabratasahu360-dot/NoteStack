import User from "../models/User.js";
import { bcryptPassword } from "../utils/hash.js";
import {generateTokenAndSetCookie} from "../utils/jwt.js";
import { validateUser } from "../utils/isValid.js";

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
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({message: "All fields required"});
  }
  if(password.length < 8){
    return res.status(400).json({message: "Password length must be atleast 8 character"});
  }

  try{
  const formattedEmail = email.toLowerCase().trim();

  const findUser = await User.findOne({email: formattedEmail});

  if(!findUser){
    return res.status(400).json({message: "Invalid Credentials"});
  }

  const isValidPassword = await validateUser(password, findUser.password);

  if(!isValidPassword){
    return res.status(400).json({message: "Invalid Credentials"});
  }

  generateTokenAndSetCookie(findUser._id, res);

  res.status(200).json({message: "Login success", findUser});
  }
  catch(error){
    console.log("Error in Login Controller: ", error.message);
    return res.status(500).json({message: "Internal Server error"});
  }
};

//---------- LOGOUT Controller ----------//
export const logout = async (req, res) => {
  try{
    res.clearCookie("jwt")
       .status(200)
       .json({message: "Logged out"});
  }
  catch(error){
    console.log("Error in Logout Controller: ", error.message);
    return res.status(500).json({message: "Internal Server Error"});
  }
};

export const checkAuth = async(req, res) => {
  try{
    res.status(200).json(req.user);
  }
  catch(error){
    console.log("Error in CheckAuth Controller: ", error.message);
    return res.status(500).json({message: "Internal Server Error"});
  }
}