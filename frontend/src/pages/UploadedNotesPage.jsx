import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { NoteCard } from "../components/NoteCard";
import { NoContent } from "../components/NoContent";
import { Footer } from "../components/Footer";
import { showAllUploadedNotes, deleteSelectedNote, countLikes } from "../api/api";
import { HiOutlineTrash, HiOutlineCloudArrowUp } from "react-icons/hi2";

export const UploadedNotesPage = () => {
  const queryClient = useQueryClient();

  const { data: uploaded, isPending } = useQuery({
    queryKey: ["uploadedNote"],
    queryFn: showAllUploadedNotes,
  });

  const { mutate: mutateDeleteNoteMutation } = useMutation({
    mutationFn: deleteSelectedNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploadedNote"] });
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      mutateDeleteNoteMutation(id);
    }
  };

  const { mutate: mutateLikeMutation } = useMutation({
    mutationFn: countLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploadedNote"] });
    },
  });

  const handleLikeCount = (id) => {
    mutateLikeMutation(id);
  };

  return (
    <div className="min-h-screen bg-base-200/40 text-base-content flex flex-col">
      <Navbar />
      <Sidebar heading="My Uploads" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <HiOutlineCloudArrowUp className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-base-content">
                Uploaded by You
              </h2>
              <p className="text-xs text-base-content/60">
                Manage notes you have published for the student community
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
        ) : uploaded?.notes?.length > 0 ? (
          <div className="space-y-3">
            {uploaded.notes.map((note, index) => (
              <NoteCard
                key={note._id || index}
                author="You"
                title={note.title}
                desc={note.description}
                category={note.category}
                tags={note.tags}
                keywords={note.keywords}
                time={note.createdAt}
                previewImage={note.previewImage}
                handleClick={() => handleDelete(note._id)}
                downloads={note.downloads || 0}
                likes={note.likesCount || 0}
                isLiked={note.isLiked}
                handleLike={() => handleLikeCount(note._id)}
                btnContent={
                  <span className="flex items-center gap-1 text-red-100 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-xl">
                    <HiOutlineTrash className="size-4" />
                    <span>Delete</span>
                  </span>
                }
              />
            ))}
          </div>
        ) : (
          <NoContent />
        )}
      </main>
      <Footer />
    </div>
  );
};
