import { MdDelete } from "react-icons/md";
import { Sidebar } from "../components/Sidebar";
import { FaReact } from "react-icons/fa";
import { RiNodejsLine } from "react-icons/ri";
import { TbBrandCSharp } from "react-icons/tb";
import { NoteCard } from "../components/NoteCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showAllUploadedNotes } from "../api/api";
import { deleteSelectedNote } from "../api/api";

export const UploadedNotesPage = () => {

  const {data: uploaded} = useQuery({
    queryKey: ["uploadedNote"],
    queryFn: showAllUploadedNotes
  });
  // console.log(uploaded);

  const queryClient = useQueryClient();

  const {mutate: mutateDeleteNoteMutation} = useMutation({
    mutationFn: deleteSelectedNote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["uploadedNote"]});
    }
  })

  const handleDelete = (id) => {
    mutateDeleteNoteMutation(id);
  };
  return (
    <>
      <Sidebar heading="Uploaded by You" />
      <div className="m-5">
        <p className="py-5 text-2xl opacity-60 tracking-wide">Uploaded Notes</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {uploaded?.uploadedNotes?.length > 0 ? 
          uploaded?.uploadedNotes?.map((note, index) => (
            <NoteCard
            key={index}
            author="You"
            title={note.title}
            desc={note.description}
            category={note.category}
            tags={note.tags}
            keywords={note.keywords}
            time={note.createdAt}
            btnContent="Delete"
            handleClick={() => handleDelete(note._id)}
            />
          )) : "You haven't uploaded any notes yet."}
        </div>
      </div>
    </>
  );
};
