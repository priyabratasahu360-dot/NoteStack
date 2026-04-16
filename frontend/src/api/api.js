import toast from "react-hot-toast";
import { axiosInstance } from "./axios";

//////////////----Auth functions----///////////////////
export const getAuthUser = async() => {
    try{
        const res = await axiosInstance.get("/auth/check");
        return res.data;
    }
    catch(error){
        console.log("Error in getAuth function: ", error);
        return null;
    }
}

export const signupMutation = async(signupData) => {
    try{
    const res = await axiosInstance.post("/auth/signup", signupData);
        toast.success("Account created");
        return res.data;
    }
    catch(error){
        console.log("Error in signup function: ", error);
        toast.error(error.response.data.message)
    }
}

export const loginMutation = async(loginData) => {
    try{
        const res = await axiosInstance.post("auth/login", loginData);
        toast.success("Login success");
        return res.data;
    }
    catch(error){
        console.log("Error in login mutaion: ", error);
        toast.error(error.response.data.message);
    }
}

export const logout = async() => {
    try{
        await axiosInstance.post("/auth/logout");
        toast.success("Logged out succesfully");
        return null;
        
    }
    catch(error){
        console.log("Error in logout function: ", error);
    }
}

/////////////----Notes functions ----/////////////////////

export const getRecommendedNotes = async() => {
    try{
        const res = await axiosInstance.get("/note/notes/recommended")
        return res.data;
    }
    catch(error){
        console.log("Error in notes recommended function: ", error);
        toast.error(error.response.data.message);
    }
}

export const getAllAvailableNotes = async() => {
    try{
        const res = await axiosInstance.get("/note/notes");
        return res.data;
    }
    catch(error){
        console.log("Error in getAllAvailableNotes function: ", error);
        toast.error(error.response.data.message);
    }
}

export const showAllUploadedNotes = async() => {
    try{
        const res = await axiosInstance.get("/note/notes/uploaded");
        return res.data;
    }
    catch(error){
        console.log("Error in showuploaded notes function: ", error);
        toast.error(error.response.data.message);
    }
}

export const createNote = async(noteData) => {
    try{
        const res = await axiosInstance.post("/note/notes", noteData);
        toast.success("Note created succesfully");
        return res.data
    }
    catch(error){
        console.log("Error in createNote function: ", error);
        toast.error(error.response.data.message);
    }
}


//////////////---- User profile ---- ////////////////

export const updateProfile = async(profileData) => {
    try{
        const res = await axiosInstance.put("/user/update-profile", profileData);
        toast.success("Profile Updated succesfully")
        return res.data;
    }
    catch(error){
        console.log("Error in updateProfile function: ", error)
        toast.error(error.response.data.message);
    }
}