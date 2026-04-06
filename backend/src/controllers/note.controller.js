import Note from "../models/Note.js";
import User from "../models/User.js";

export const getAllNotes = async(req, res) => {
    try{
        const notes = await Note.find({}); // get all notes from database in the notes collection

        if(!notes){
            return res.status(200).json({message: "No notes available"});
        }
        res.status(200).json({message: "All available notes", notes});
    }
    catch(error){
        console.log("Error in getAllNotes controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getRecommendedNotes = async(req, res) => {
    try{
        const user = req.user;

        const tags = user?.notePreferences; // notePreferences contain tags
        if(!tags){
            return res.status(404).json({message: "Please update your preferences to get recommended notes"});
        }
        
        const notes = await Note.find({tags: tags});
        res.status(200).json({message: "recommended notes based on your profile", notes});;
    }
    catch(error){
        console.log("Error in recommendednotes controller: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
export const getSingleNote = (req, res) => {
    return res.json("single note");
}
export const getDownlodedNotes = (req, res) => {
    return res.json("downloaded");
}
export const getUploadedNotes = (req, res) => {
    return res.json("uploaded");
}
export const uploadNote = async(req, res) => {
    const {title,
           description,
           category,
           tags,
           keywords,
           files} = req.body;

    if(!title || !description){
        return res.status(400).json({message: "Please add a title and description to your note"});
    }
    if(!files){
        return res.status(400).json({message: "Please upload your file"});
    }
    const authorId = req.user._id; // get the id of current user
    try{    
        const createNote = await Note.create({
            authorId,
            title,
            description,
            category,
            tags,
            keywords,
            files
        });
            
        res.status(201).json({message: "Note created succesfully", note: createNote});
        }
        catch(error){
            console.log("Erroe in uploadNote controller: ", error);
            return res.status(500).json("Internal server error");
        }
}
export const updateExistingNote = (req, res) => {
    return res.json("update note");
}
export const deleteSelectedNote = (req, res) => {
    return res.json("delete note");
}