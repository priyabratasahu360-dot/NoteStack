// all available notes
import { IoMdArrowDropdownCircle, IoMdDownload } from "react-icons/io";
import { NoteCard } from "../components/NoteCard";
import { useQuery } from "@tanstack/react-query";
import { getAllAvailableNotes } from "../api/api";
export const NotesPage = () => {

  const {data: allNotes} = useQuery({
    queryKey: ["allNotes"],
    queryFn: getAllAvailableNotes
  });

  // console.log(allNotes)
  return (
   <div className="m-5">
         <p className="py-5 text-2xl opacity-60 tracking-wide">
           All available Notes
         </p>
   
         <div className="collapse bg-base-100 border border-base-300">
           <input type="checkbox" />
           <div className="collapse-title font-semibold opacity-70 flex justify-between items-center px-3">
             <span>Show</span>
             <IoMdArrowDropdownCircle className="size-5" />
           </div>
           <div className="collapse-content text-sm">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {allNotes ? allNotes.notes.map((note, index) => (
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
                />
              )) : "Loading"}
             </div>
           </div>
         </div>
       </div>
  );
};
