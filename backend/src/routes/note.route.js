import express from "express";

import { getAllNotes, getRecommendedNotes, getSingleNote, getDownlodedNotes, getUploadedNotes, uploadNote, updateExistingNote, deleteSelectedNote } from "../controllers/note.controller.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/notes", getAllNotes); // get all available notes && also for like -: ?search=react

router.get("/notes/recommended", protectRoute, getRecommendedNotes); // get recommended note based on your profile
router.get("/notes/downloaded", protectRoute, getDownlodedNotes); // downloded notes
router.get("/notes/uploaded", protectRoute, getUploadedNotes); // get all notes you have been created


router.post("/notes", protectRoute, uploadNote); // create a new note

router.get("/notes/:id", protectRoute, getSingleNote); // get a specific note by id

router.patch("/notes/:id", protectRoute, updateExistingNote); // edit or update a existing note


router.delete("/notes/:id", protectRoute, deleteSelectedNote); // delete a specific note

export default router;