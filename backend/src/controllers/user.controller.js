import User from "../models/User.js";
export const updateProfile = async(req, res) => {
    const {profilePhoto, notePreferences} = req.body;

    try{
        const userId = req.user._id;

        const updateData = {};
        if(profilePhoto) {
            updateData.profilePhoto = profilePhoto;
        }
        if(notePreferences && notePreferences.length > 0){
            updateData.$addToSet = {
                notePreferences: {$each: notePreferences}
            }
        }
        if(Object.keys(updateData).length === 0){
            return res.status(400).json({message: "No data passed to update profile"});
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {returnDocument: "after"}).select("-password");

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