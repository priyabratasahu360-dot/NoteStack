import express from "express";
import multer from "multer";

import { getAllNotes, searchedNotes, getRecommendedNotes, getSingleNote, getDownlodedNotes, getUploadedNotes, uploadNote, updateExistingNote, deleteSelectedNote, downloadNote, getStats } from "../controllers/note.controller.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

const upload = multer({dest: "uploads/"})

router.get("/notes", getAllNotes); // get all available notes 

router.get("/notes/search", protectRoute, searchedNotes);

router.get("/notes/stats", protectRoute, getStats); // get all users and total downloads

router.get("/notes/recommended", protectRoute, getRecommendedNotes); // get recommended note based on your profile
router.get("/notes/downloaded", protectRoute, getDownlodedNotes); // downloded notes
router.get("/notes/uploaded", protectRoute, getUploadedNotes); // get all notes you have been created


router.post("/notes", protectRoute, upload.single("file"), uploadNote); // create a new note
router.post("/notes/:id/download",protectRoute, downloadNote); // download a note

router.get("/notes/:id", protectRoute, getSingleNote); // get a specific note by id

router.patch("/notes/:id", protectRoute, updateExistingNote); // edit or update a existing note


router.delete("/notes/:id", protectRoute, deleteSelectedNote); // delete a specific note

export default router;