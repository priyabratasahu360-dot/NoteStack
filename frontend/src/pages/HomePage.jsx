import { Link } from "react-router-dom";
export const HomePage = () => {
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
              <Link to={"/login"}>Get Started</Link>
            </button>
          </div>
        </div>
      </div>
      {/* bottom area */}
    </div>
  );
};
