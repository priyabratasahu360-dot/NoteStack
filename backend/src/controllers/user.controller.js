import User from "../models/User.js";
export const updateProfile = async(req, res) => {
    const {profilePhoto, notePreferences} = req.body;

    try{
    if(!profilePhoto || !notePreferences){
        return res.status(400).json({message: "Please add both photo and atleast one tag"});
    }

        const userId = req.user._id;

        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePhoto: profilePhoto,
            notePreferences: notePreferences
        }, {returnDocument: "after"}).select("-password");

        if(!updatedUser){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({message: "Profile updated", updatedUser})
    }
    catch(error){
        console.log("Error in updateProfile controller: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}