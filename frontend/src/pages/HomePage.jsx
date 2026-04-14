import { Link } from "react-router-dom";
import { getAuthUser } from "../api/api";
import { useQuery } from "@tanstack/react-query";
export const HomePage = () => {
  const {data: authUser} = useQuery({
      queryKey: ["authUser"],
      queryFn: getAuthUser
    });
  return (
    <div className="min-h-screen">
      {/* top area */}
      <div className="hero bg-base-200 py-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Why NoteStack ?</h1>
            <p className="py-6">
              Here in Notestack you will find best notes in the world. Don't
              just watch click on the the button below to start you journey with
              us.
            </p>
            <button className="btn btn-primary">
              {!authUser ?
              (<Link to={"/login"}>Get Started</Link>) :
              (<Link to={"/note"}>Explore More</Link>) //link to dashboard page if authenticated
              }
            </button>
          </div>
        </div>
      </div>
      {/* bottom area */}
    </div>
  );
};
