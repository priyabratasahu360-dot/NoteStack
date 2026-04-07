import mongoose from "mongoose";

const downloadedNoteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
    },
    downloadedAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const DownloadedNote = mongoose.model("DownloadedNote", downloadedNoteSchema);

export default DownloadedNote;