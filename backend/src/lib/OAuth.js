import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.SERVER_URL + "/api/auth/google/callback"
    }, async(accessToken, refreshToken, profile, done) => {
        try{
            const email = profile.emails[0].value
            let user = await User.findOne({ email });

            if(!user){
                user = await User.create({
                    //create new user
                    googleId: profile.id,
                    userName: profile.displayName,
                    email,
                    profilePhoto: profile.photos[0]?.value || ""
                })
            } else if(!user.googleId){
                //link google acc to user
                user.googleId = profile.id;
                await user.save();
            }
            return done(null, user);
        }
        catch(error){
            return done(error, null)
        }
    })
)