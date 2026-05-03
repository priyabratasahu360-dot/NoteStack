//EXTERNAL LIBRARIES
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//API FUNCTIONS
import { countLikes, downloadNote, getAllAvailableNotes, } from "../api/api";

//PAGE COMPONENTS
import { NoteCard } from "../components/NoteCard";

//ASSETS (Icons)
import { IoMdArrowDropdownCircle, IoMdDownload } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const NotesPage = () => {
  const queryClient = useQueryClient();

  const { data: allNotes, isPending } = useQuery({
    queryKey: ["allNotes"],
    queryFn: getAllAvailableNotes,
  });
  console.log(allNotes);

  const { mutate: mutateDownloadMutation } = useMutation({
    mutationFn: downloadNote,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["appStats"] });
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

  const {mutate: mutateLikeMutation} = useMutation({
    mutationFn: countLikes,
    onSuccess: (data) => {
      console.log(data.isLikes);
      queryClient.invalidateQueries({queryKey: ["allNotes"]});
    }
  });

  const handleLikeCount = (id) => {
    mutateLikeMutation(id);
  }

  return (
    <div className="m-5">
      <p className="py-5 text-2xl opacity-60 tracking-wide">
        All available Notes
      </p>

      <div className="carousel w-full flex gap-2 p-4">
            {isPending ? (
              <AiOutlineLoading3Quarters className="size-8 animate-spin" />
            ) : allNotes.notes.length > 0 ? (
              allNotes.notes.map((note, index) => (
                <div className="carousel-item w-70 lg:w-90 transition duration-400 hover:scale-102">
                <NoteCard
                  key={index}
                  author={note.authorId.userName}
                  title={note.title}
                  desc={note.description}
                  category={note.category}
                  time={note.createdAt}
                  btnContent={<IoMdDownload className="size-6"/>}
                  previewImage={note.previewImage}
                  handleClick={() => handleDownloadNote(note._id)}
                  downloads={note.downloads}
                  likes={note.likes.length}
                  handleLike={() => handleLikeCount(note._id)}
                  />
                  </div>
              ))
            ) : (
              <div className="flex gap-2">
                <FaExclamationCircle className="size-5 text-yellow-500" />
                <p>No notes available to download</p>
              </div>
            )}
          </div>
    </div>
  );
};
