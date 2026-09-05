import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { countLikes, downloadNote, getAllAvailableNotes } from "../api/api";
import { NoteCard } from "../components/NoteCard";
import { 
  HiOutlineDocumentDuplicate,
  HiOutlineArrowDownTray,
  HiOutlineChevronLeft,
  HiOutlineChevronRight
} from "react-icons/hi2";

export const NotesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const queryClient = useQueryClient();

  const { data: notesData, isPending } = useQuery({
    queryKey: ["allNotes", currentPage],
    queryFn: () => getAllAvailableNotes(currentPage, limit),
  });

  const { mutate: mutateDownloadMutation } = useMutation({
    mutationFn: downloadNote,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["appStats"] });
      if (data?.Url) {
        const res = await fetch(data.Url);
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "note.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }
    },
  });

  const handleDownloadNote = (id) => {
    mutateDownloadMutation(id);
  };

  const { mutate: mutateLikeMutation } = useMutation({
    mutationFn: countLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
      queryClient.invalidateQueries({ queryKey: ["recommendedNotes"] });
    },
  });

  const handleLikeCount = (id) => {
    mutateLikeMutation(id);
  };

  const notesList = notesData?.notes || [];
  const totalPages = notesData?.totalPages || 1;
  const totalNotes = notesData?.totalNotes || notesList.length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <HiOutlineDocumentDuplicate className="size-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-base-content">
              All Available Notes
            </h2>
            <p className="text-xs text-base-content/60">
              {totalNotes > 0
                ? `Showing page ${currentPage} of ${totalPages} (${totalNotes} total notes)`
                : "Explore notes from the student community"}
            </p>
          </div>
        </div>
      </div>

      {/* Listed Files */}
      {isPending ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-20 rounded-2xl bg-base-100 border border-base-content/10 animate-pulse p-4"
            />
          ))}
        </div>
      ) : notesList.length > 0 ? (
        <div className="space-y-3">
          {notesList.map((note, index) => (
            <NoteCard
              key={note._id || index}
              author={note.authorId?.userName || "Anonymous"}
              title={note.title}
              desc={note.description}
              category={note.category}
              tags={note.tags}
              keywords={note.keywords}
              time={note.createdAt}
              previewImage={note.previewImage}
              handleClick={() => handleDownloadNote(note._id)}
              downloads={note.downloads || 0}
              likes={note.likesCount || 0}
              isLiked={note.isLiked}
              handleLike={() => handleLikeCount(note._id)}
              btnContent={
                <>
                  <HiOutlineArrowDownTray className="size-4" />
                  <span>Download</span>
                </>
              }
            />
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-base-100 border border-base-content/10 text-center">
          <p className="text-sm text-base-content/60">No notes available right now.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-base-content/10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage <= 1 || isPending}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-base-100 border border-base-content/10 hover:bg-base-200 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <HiOutlineChevronLeft className="size-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-primary text-primary-content shadow-sm"
                    : "bg-base-100 border border-base-content/10 hover:bg-base-200 text-base-content/80"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage >= totalPages || isPending}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-base-100 border border-base-content/10 hover:bg-base-200 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <span>Next</span>
            <HiOutlineChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
};
