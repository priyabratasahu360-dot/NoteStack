//EXTERNAL LIBRARIES
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//PAGE COMPONENTS
import { Sidebar } from "../components/Sidebar";
import { NoteCard } from "../components/NoteCard";
import { NoContent } from "../components/NoContent";

//API FUNCTIONS
import { showAllUploadedNotes, deleteSelectedNote, countLikes } from "../api/api";

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
  console.log(uploaded);

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

    const {mutate: mutateLikeMutation} = useMutation({
      mutationFn: countLikes,
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries({queryKey: ["uploadedNote"]});
      }
    });
  
    const handleLikeCount = (id) => {
      mutateLikeMutation(id);
    }
  return (
    <>
      <Sidebar heading="Uploaded by You" />
      <div className="m-5">
        <p className="py-5 text-2xl opacity-60 tracking-wide">Uploaded Notes</p>

        <div className="carousel w-full flex gap-2 p-4">
          {uploaded?.notes?.length > 0 ? (
            uploaded?.notes?.map((note, index) => (
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
                  isLiked={note.isLiked}
                  likes={note.likesCount}
                  handleLike={() => handleLikeCount(note._id)}
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
