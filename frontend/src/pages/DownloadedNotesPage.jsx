import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { NoteCard } from "../components/NoteCard";
import { Footer } from "../components/Footer";
import { countLikes, showAllDownloadedNotes } from "../api/api";
import { HiOutlineArrowDownTray, HiOutlineDocumentText } from "react-icons/hi2";
import { Link } from "react-router-dom";

export const DownloadedNotesPage = () => {
  const queryClient = useQueryClient();

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
    <div className="min-h-screen bg-base-200/40 text-base-content flex flex-col">
      <Navbar />
      <Sidebar heading="My Downloads" />

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
                      window.open(note.fileUrl, "_blank");
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
    </div>
  );
};
