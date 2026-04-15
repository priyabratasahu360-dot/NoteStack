import Note from "../models/Note.js";
import DownloadedNote from "../models/DownloadedNote.js";
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
        
        const notes = await Note.find({tags: tags}).populate("authorId");

        res.status(200).json({message: "recommended notes based on your profile", notes});;
    }
    catch(error){
        console.log("Error in recommendednotes controller: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
export const getSingleNote = async(req, res) => {
    try{
    const {id} = req.params;

    const note = await Note.findById(id);

    if(!note){
        return res.status(404).json({message: "Something went wrong"});
    }

    return res.status(200).json({message: "Note is available", note});
    }
    catch(error){
        console.log("Error in getSingleNote controller: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
export const getDownlodedNotes = async(req, res) => {
    const userId = req.user._id;

    try{
        const downloadedNotes = await DownloadedNote.find({userId: userId}).populate("noteId"); //auto fetch note data

        if(downloadedNotes.length === 0){
            return res.status(200).json({message: "There is no notes available"});
        }
        res.status(200).json({message: "Your downloaded notes", downloadedNotes});
    }
    catch(error){
        console.log("Error in getDownloaded notes: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
export const getUploadedNotes = async(req, res) => {
    const userId = req.user._id;
    if(!userId){
        return res.status(401).json({message: "You are Unauthorized - can't get uploaded notes"});
    }
    try{
        const uploadedNotes = await Note.find({authorId: userId}).populate("authorId", "_id email title description category tags keywords files");
        // you can get more fileds or less based on the requirement just need to change populate
        // you cann't change "authorId" in populate because it a ref to authorId and we are getting field values like "_id" and "email" of user

        if(uploadedNotes.length === 0){
            return res.status(200).json({message: "You haven't uploaded any notes yet"});
        }

        res.status(200).json({message: "Your uploaded notes", uploadedNotes})
    }
    catch(error){
        console.log("Error in getUploadedNotes controller: ", error);
        return res.json(500).json({message: "Internal server error"});
    }
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
export const updateExistingNote = async(req, res) => {
    const {title, description, category, tags, keywords} = req.body;
    const {id: noteId} = req.params;
    const userId = req.user._id;
    try{
        // Except file you can update every single field
        const updatedNote = await Note.findOneAndUpdate(
            {_id: noteId, authorId: userId}, //you can only update your notes
            {
            title,
            description,
            category,
            tags,
            keywords
        }, {
            returnDocument: "after", // returns updated document
            runValidators: true //this ensures incomming data must follow note schema
        });

        if(!updatedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Notes updated succesfully", updatedNote});
    }
    catch(error){
        console.log("Error in updateExistingNote controller: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
export const deleteSelectedNote = async(req, res) => {
    const {id: noteId} = req.params;
    const userId = req.user._id;
    if(!userId){
        return res.status(401).json({message: "unauthorized access"});
    }
    try{
        const selectedNote = await Note.findOneAndDelete({_id: noteId, authorId: userId});

        if(!selectedNote){
            return res.status(404).json({message: "Note not found"});
        }

        res.status(200).json({message: "Note deleted successfully", deletedNote: selectedNote});
    }
    catch(error){
        console.log("Error in deleteSelectedNote controller: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const downloadNote = async(req, res) => {
    const {id: noteId} = req.params;
    const userId = req.user._id;

    if(!noteId || !userId){
        return res.status(400).json({message: "Bad request"});
    }
    try{
        const note = await Note.findById(noteId);
        if(!note){
            return res.status(404).json({message: "Something went wrong"});
        }

        const addToDownloadedNote = await DownloadedNote.create({
            userId: userId,
            noteId: noteId,
        });

        res.status(201).json({message: "note succesfully added to downloaded note list", addedNote: addToDownloadedNote});

    }
    catch(error){
        console.log("Error in downloadNote controller: ", error);
        return res.status(500).json({message: "Internal Server error"});
    }
}