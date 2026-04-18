//EXTERNAL LIBRARIES
import { useMutation, useQuery } from "@tanstack/react-query";

//PAGE COMPONENTS
import { NoteCard } from "../components/NoteCard";

//API FUNCTIONS
import { getRecommendedNotes, downloadNote } from "../api/api";

//ASSETS (Icons)
import { IoMdDownload } from "react-icons/io";
import { IoMdArrowDropdownCircle } from "react-icons/io";

export const RecommendedNotesPage = () => {

  const {data: recomNotes} = useQuery({
    queryKey: ["recommendedNotes"],
    queryFn: getRecommendedNotes
  });

  const {mutate: mutateDownloadMutation} = useMutation({
    mutationFn: downloadNote,
    onSuccess: async(data) => {
      // console.log(data);

      if(data?.Url){
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
    }
  });

   const handleDownloadNote = async(id) => {
      mutateDownloadMutation(id);
    }
  return (
    <div className="m-5">
      <p className="py-5 text-2xl opacity-60 tracking-wide">
        Recommended Notes
      </p>

      <div className="collapse bg-base-100 border border-base-300">
        <input type="checkbox" />
        <div className="collapse-title font-semibold opacity-70 flex justify-between items-center px-3">
          <span>Show</span>
          <IoMdArrowDropdownCircle className="size-5" />
        </div>
        <div className="collapse-content text-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {
              recomNotes?.notes.length > 0 ?
              recomNotes?.notes.map((note, index) => (
                <NoteCard
                  key={index}
                  author={note.authorId.userName}
                  title={note.title}
                  desc={note.description}
                  category={note.category}
                  tags={note.tags}
                  keywords={note.keywords}
                  time={note.createdAt}
                  btnContent="Download"
                  handleClick={() => handleDownloadNote(note._id)}
                />
              )) : "No recommended notes available"
            }
          </div>
        </div>
      </div>
    </div>
  );
};
