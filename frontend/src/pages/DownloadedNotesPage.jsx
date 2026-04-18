//EXTERNAL LIBRARIES
import { useQuery } from "@tanstack/react-query";

//API FUNCTIONS
import { showAllDownloadedNotes } from "../api/api";

//PAGE COMPONENTS
import { Sidebar } from "../components/Sidebar";
import { NoteCard } from "../components/NoteCard";

//ASSETS (Icons)
import { IoOpen } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export const DownloadedNotesPage = () => {
  const { data: downloadedNotes, isPending } = useQuery({
    queryKey: ["downloadedNote"],
    queryFn: showAllDownloadedNotes,
  });
  // console.log(downloadedNotes);
  return (
    <>
      <Sidebar heading="Downloads" />
      <div className="m-5">
        <p className="py-5 text-2xl opacity-60 tracking-wide">
          Downloaded Notes
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {isPending ? <AiOutlineLoading3Quarters className="size-8 animate-spin"/> : (downloadedNotes?.filteredNotes.length > 0
            ? downloadedNotes?.filteredNotes?.map((note, index) => (
                <NoteCard
                  key={index}
                  author={note.noteId.authorId.userName}
                  title={note.noteId.title}
                  desc={note.noteId.description}
                  category={note.noteId.category}
                  tags={note.noteId.tags}
                  keywords={note.noteId.keywords}
                  time={note.createdAt}
                  btnContent="View"
                />
              ))
            : "No downloaded notes available")}
        </div>
      </div>
    </>
  );
};
