import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true
    },
    keywords: {
        type: [String],
        required: true
    },
    files: [
        {
            url: String,
            type: String,
            size: Number
        }
    ]
}, {timestamps: true});

const Note = mongoose.model("Note", noteSchema);
export default Note;