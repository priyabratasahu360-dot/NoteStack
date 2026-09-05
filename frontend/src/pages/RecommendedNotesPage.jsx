import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecommendedNotes, downloadNote, countLikes } from "../api/api";
import { NoteCard } from "../components/NoteCard";
import { 
  HiOutlineSparkles, 
  HiOutlineArrowDownTray 
} from "react-icons/hi2";

export const RecommendedNotesPage = () => {
  const queryClient = useQueryClient();

  const { data: recomNotes, isPending } = useQuery({
    queryKey: ["recommendedNotes"],
    queryFn: getRecommendedNotes,
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
      queryClient.invalidateQueries({ queryKey: ["recommendedNotes"] });
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
    },
  });

  const handleLikeCount = (id) => {
    mutateLikeMutation(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
            <HiOutlineSparkles className="size-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-base-content">
              Recommended For You
            </h2>
            <p className="text-xs text-base-content/60">
              Personalized based on your saved subject preferences
            </p>
          </div>
        </div>
      </div>

      {isPending ? (
        <div className="space-y-3">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="h-20 rounded-2xl bg-base-100 border border-base-content/10 animate-pulse p-4"
            />
          ))}
        </div>
      ) : recomNotes?.notes?.length > 0 ? (
        <div className="space-y-3">
          {recomNotes.notes.map((note, index) => (
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
        <div className="p-6 rounded-2xl bg-base-100 border border-base-content/10 text-center">
          <p className="text-sm text-base-content/60">
            No recommendations yet. Add topics to your Profile to receive tailored notes!
          </p>
        </div>
      )}
    </div>
  );
};
