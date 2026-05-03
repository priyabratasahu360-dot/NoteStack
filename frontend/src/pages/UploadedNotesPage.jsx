//EXTERNAL LIBRARIES
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//PAGE COMPONENTS
import { Sidebar } from "../components/Sidebar";
import { NoteCard } from "../components/NoteCard";
import { NoContent } from "../components/NoContent";

//API FUNCTIONS
import { showAllUploadedNotes, deleteSelectedNote } from "../api/api";

//ASSETS (Icons)
import { MdDelete } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { RiNodejsLine } from "react-icons/ri";
import { TbBrandCSharp } from "react-icons/tb";

export const UploadedNotesPage = () => {
  const { data: uploaded } = useQuery({
    queryKey: ["uploadedNote"],
    queryFn: showAllUploadedNotes,
  });
  // console.log(uploaded);

  const queryClient = useQueryClient();

  const { mutate: mutateDeleteNoteMutation } = useMutation({
    mutationFn: deleteSelectedNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploadedNote"] });
    },
  });

  const handleDelete = (id) => {
    mutateDeleteNoteMutation(id);
  };
  return (
    <>
      <Sidebar heading="Uploaded by You" />
      <div className="m-5">
        <p className="py-5 text-2xl opacity-60 tracking-wide">Uploaded Notes</p>

        <div className="carousel w-full flex gap-2 p-4">
          {uploaded?.uploadedNotes?.length > 0 ? (
            uploaded?.uploadedNotes?.map((note, index) => (
              <div className="carousel-item w-70 lg:w-90 transition duration-400 hover:scale-102">
                <NoteCard
                  key={index}
                  author="You"
                  title={note.title}
                  desc={note.description}
                  category={note.category}
                  time={note.createdAt}
                  btnContent={<MdDelete className="size-6 text-red-500"/>}
                  previewImage={note.previewImage}
                  handleClick={() => handleDelete(note._id)}
                  downloads={note.downloads}
                />
              </div>
            ))
          ) : (
            <NoContent />
          )}
        </div>
      </div>
    </>
  );
};
