//EXTERNAL LIBRARIES
import { useMutation, useQuery } from "@tanstack/react-query";

//PAGE COMPONENTS
import { NoteCard } from "../components/NoteCard";

//API FUNCTIONS
import { getRecommendedNotes, downloadNote } from "../api/api";

//ASSETS (Icons)
import { IoMdDownload } from "react-icons/io";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";

export const RecommendedNotesPage = () => {
  const { data: recomNotes } = useQuery({
    queryKey: ["recommendedNotes"],
    queryFn: getRecommendedNotes,
  });

  // console.log(recomNotes);

  const { mutate: mutateDownloadMutation } = useMutation({
    mutationFn: downloadNote,
    onSuccess: async (data) => {
      // console.log(data);

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

  const handleDownloadNote = async (id) => {
    mutateDownloadMutation(id);
  };
  return (
    <div className="m-5">
      <p className="py-5 text-2xl opacity-60 tracking-wide">
        Recommended Notes
      </p>

      <div className="carousel w-full flex gap-2 p-4">
        {recomNotes?.notes.length > 0 ? (
          recomNotes?.notes.map((note, index) => (
            <div className="carousel-item w-70 lg:w-90 transition duration-400 hover:scale-102">
              <NoteCard
                key={index}
                author={note.authorId.userName}
                title={note.title}
                desc={note.description}
                category={note.category}
                time={note.createdAt}
                btnContent={<IoMdDownload className="size-6" />}
                previewImage={note.previewImage}
                handleClick={() => handleDownloadNote(note._id)}
              />
            </div>
          ))
        ) : (
          <div className="flex gap-2">
            <FaExclamationCircle className="size-5 text-yellow-500" />
            <p>No recommended notes available</p>
          </div>
        )}
      </div>
    </div>
  );
};
