//EXTERNAL LIBRARIES
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//API FUNCTIONS
import { getAuthUser, getSearchedNotes } from "../api/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { NoteCard } from "../components/NoteCard";

export const HomePage = () => {
  const [params] = useSearchParams();
  const query = params.get("query");

  const { data: searchedNotes, isLoading } = useQuery({
    queryKey: ["searchedNoteData"],
    queryFn: () => getSearchedNotes(query),
    enabled: !!query, //runs only when query exist
  });

  console.log(searchedNotes);

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* top area */}
      <div className="hero py-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Why NoteStack ?</h1>
            <p className="py-6">
              Here in Notestack you will find best notes in the world. Don't
              just watch click on the the button below to start you journey with
              us.
            </p>
            <button className="btn btn-primary">
              {
                !authUser ? (
                  <Link to={"/login"}>Get Started</Link>
                ) : (
                  <Link to={"/note"}>Explore More</Link>
                ) //link to dashboard page if authenticated
              }
            </button>
          </div>
        </div>
      </div>
      {/* bottom area */}
      <div className="flex flex-col gap-2 m-10">
        {isLoading ? (
          <AiOutlineLoading3Quarters className="size-8 animate-spin" />
        ) : searchedNotes?.notes?.length > 0 ? (
          searchedNotes?.notes?.map((note, index) => (
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
              previewImage={note.previewImage}
            />
          ))
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
