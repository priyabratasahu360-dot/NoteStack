import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    try{
        const token = jwt.sign(
            {userId}, // payload 
            process.env.JWT_SECRET_KEY, // secret key
            {expiresIn: "15m"} // expire time 'm - minutes'
        );
        
        // Set token inside cookie
        res.cookie("jwt", token, {
            httpOnly: true, // prevents XSS attacks
            secure: false, // true in https protocol
            sameSite: "strict",
            maxAge: 15 * 60 * 1000 // 15min * 60sec * 1000ms
        });
        
        return token;
    }
    catch(error){
        console.log("Error generating token");
        throw new Error("token generation failed");
    }
}