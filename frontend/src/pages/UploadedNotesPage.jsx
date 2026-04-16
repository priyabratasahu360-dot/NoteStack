import { MdDelete } from "react-icons/md";
import { Sidebar } from "../components/Sidebar";
import { FaReact } from "react-icons/fa";
import { RiNodejsLine } from "react-icons/ri";
import { TbBrandCSharp } from "react-icons/tb";
import { NoteCard } from "../components/NoteCard";
import { useQuery } from "@tanstack/react-query";
import { showAllUploadedNotes } from "../api/api";

export const UploadedNotesPage = () => {

  const {data: uploaded} = useQuery({
    queryKey: ["uploadedNote"],
    queryFn: showAllUploadedNotes
  });
  console.log(uploaded)
  return (
    <>
      <Sidebar heading="Uploaded by You" />
      <div className="m-5">
        <p className="py-5 text-2xl opacity-60 tracking-wide">Uploaded Notes</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {uploaded?.uploadedNotes.length > 0 ? 
          uploaded.uploadedNotes.map((note, index) => (
            <NoteCard
            key={index}
            author="You"
            title={note.title}
            desc={note.description}
            category={note.category}
            tags={note.tags}
            keywords={note.keywords}
            time={note.time}
            btnContent="Delete"
            />
          )) : "You haven't uploaded any notes yet."}
        </div>
      </div>
    </>
  );
};
