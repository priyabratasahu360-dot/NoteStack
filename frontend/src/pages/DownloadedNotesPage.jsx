import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "../components/Navbar";
import { NoteCard } from "../components/NoteCard";
import { Footer } from "../components/Footer";
import { countLikes, showAllDownloadedNotes } from "../api/api";
import { HiOutlineArrowDownTray, HiOutlineDocumentText } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useState } from "react";

export const DownloadedNotesPage = () => {
  const queryClient = useQueryClient();
  const [activeFileUrl, setActiveFileUrl] = useState(null);
  const [activeNoteTitle, setActiveNoteTitle] = useState("");

  const { data: downloadedNotes, isPending } = useQuery({
    queryKey: ["downloadedNote"],
    queryFn: showAllDownloadedNotes,
  });

  const { mutate: mutateLikeMutation } = useMutation({
    mutationFn: countLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["downloadedNote"] });
    },
  });

  const handleLikeCount = (id) => {
    mutateLikeMutation(id);
  };

  return (
    <div className="min-h-screen bg-base-200/40 text-base-content flex flex-col relative">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <HiOutlineArrowDownTray className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-base-content">
                Downloaded Notes
              </h2>
              <p className="text-xs text-base-content/60">
                Quick access to study materials you have saved
              </p>
            </div>
          </div>
        </div>

        {isPending ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-20 rounded-2xl bg-base-100 border border-base-content/10 animate-pulse p-4" />
            ))}
          </div>
        ) : downloadedNotes?.notes?.length > 0 ? (
          <div className="space-y-3">
            {downloadedNotes.notes.map((item, index) => {
              const note = item.noteId;
              if (!note) return null;
              return (
                <NoteCard
                  key={note._id || index}
                  author={note.authorId?.userName || "Community"}
                  title={note.title}
                  desc={note.description}
                  category={note.category}
                  tags={note.tags}
                  keywords={note.keywords}
                  time={item.createdAt || note.createdAt}
                  previewImage={note.previewImage}
                  downloads={note.downloads || 0}
                  likes={note.likesCount || 0}
                  isLiked={note.isLiked}
                  handleLike={() => handleLikeCount(note._id)}
                  handleClick={() => {
                    if (note.fileUrl) {
                      setActiveFileUrl(note.fileUrl);
                      setActiveNoteTitle(note.title || "Note Viewer");
                    }
                  }}
                  btnContent={
                    <span className="flex items-center gap-1">
                      <HiOutlineDocumentText className="size-4" />
                      <span>Open File</span>
                    </span>
                  }
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-base-100 border border-base-content/10 shadow-xs max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <HiOutlineArrowDownTray className="size-8" />
            </div>
            <h3 className="text-xl font-extrabold text-base-content">
              No downloads yet
            </h3>
            <p className="text-sm text-base-content/60 mt-1.5 max-w-sm">
              You haven't downloaded any notes yet. Browse the community library to find helpful guides and cheatsheets.
            </p>
            <Link
              to="/note"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-content shadow-md shadow-primary/20 transition active:scale-95"
            >
              Explore Notes
            </Link>
          </div>
        )}
      </main>
      <Footer />

      {/* In-app Document Viewer Overlay */}
      {activeFileUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-5xl h-[85vh] bg-base-100 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-base-content/10">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-base-content/10">
              <h3 className="font-extrabold text-lg text-base-content truncate">
                {activeNoteTitle}
              </h3>
              <button
                onClick={() => {
                  setActiveFileUrl(null);
                  setActiveNoteTitle("");
                }}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-base-200 hover:bg-base-300 text-base-content/80 font-bold transition active:scale-95"
              >
                ✕
              </button>
            </div>

            {/* Viewer Workspace */}
            <div className="flex-1 w-full bg-base-200/40">
              {activeFileUrl.toLowerCase().endsWith(".pdf") ? (
                <iframe
                  src={`${activeFileUrl}#toolbar=0`}
                  title={activeNoteTitle}
                  className="w-full h-full border-0"
                />
              ) : activeFileUrl.match(/\.(jpeg|jpg|png|gif|webp|svg)$/i) ? (
                <div className="flex items-center justify-center h-full p-6">
                  <img
                    src={activeFileUrl}
                    alt={activeNoteTitle}
                    className="max-h-full max-w-full object-contain rounded-2xl shadow-sm"
                  />
                </div>
              ) : (
                <iframe
                  src={activeFileUrl}
                  title={activeNoteTitle}
                  className="w-full h-full border-0 bg-white"
                />
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
