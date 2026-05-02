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
import { FaExclamationCircle } from "react-icons/fa";

export const DownloadedNotesPage = () => {
  const { data: downloadedNotes, isPending } = useQuery({
    queryKey: ["downloadedNote"],
    queryFn: showAllDownloadedNotes,
  });
  console.log(downloadedNotes);
  return (
    <>
      <Sidebar heading="Downloads" />
      <div className="m-5">
        <p className="py-5 text-2xl opacity-60 tracking-wide">
          Downloaded Notes
        </p>

        <div className="carousel w-full flex gap-2 p-4">
          {isPending ? (
            <AiOutlineLoading3Quarters className="size-8 animate-spin" />
          ) : downloadedNotes?.filteredNotes?.length > 0 ? (
            downloadedNotes?.filteredNotes?.map((note, index) => (
              <div className="carousel-item w-70 lg:w-90 transition duration-400 hover:scale-102">
                <NoteCard
                  key={index}
                  author={note.noteId.authorId.userName}
                  title={note.noteId.title}
                  desc={note.noteId.description}
                  category={note.noteId.category}
                  tags={note.noteId.tags}
                  keywords={note.noteId.keywords}
                  time={note.createdAt}
                  previewImage={note.noteId.previewImage}
                  btnContent={<IoOpen className="size-6"/>}
                />
              </div>
            ))
          ) : (
            
            <div className="flex gap-2">
                              <FaExclamationCircle className="size-5 text-yellow-500"/>
                              <p>"No downloaded notes available"</p>
                            </div>
          )}
        </div>
      </div>
    </>
  );
};
