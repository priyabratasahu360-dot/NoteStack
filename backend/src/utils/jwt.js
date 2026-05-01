import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    try{
        const token = jwt.sign(
            {userId}, // payload 
            process.env.JWT_SECRET_KEY, // secret key
            {expiresIn: "1d"} // expire time 'm - minutes'
        );
        
        // Set token inside cookie
        res.cookie("jwt", token, {
            httpOnly: true, // prevents XSS attacks
            secure: false, // true in https protocol
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000 
        });
        
        return token;
    }
    catch(error){
        console.log("Error generating token");
        throw new Error("token generation failed");
    }
}