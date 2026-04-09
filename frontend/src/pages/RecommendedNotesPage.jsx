import { IoMdDownload } from "react-icons/io";
import { NoteCard } from "../components/NoteCard";
import { IoMdArrowDropdownCircle } from "react-icons/io";

export const RecommendedNotesPage = () => {
  return (
    <div className="m-5">
      <p className="py-5 text-2xl opacity-60 tracking-wide">
        Recommended Notes
      </p>

      <div className="collapse bg-base-100 border border-base-300">
        <input type="checkbox" />
        <div className="collapse-title font-semibold opacity-70 flex justify-between items-center px-3">
          <span>Show</span>
          <IoMdArrowDropdownCircle className="size-5" />
        </div>
        <div className="collapse-content text-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <NoteCard
              author="miku"
              title="react"
              desc="react from basics to advanced"
              category="web development"
              tags={["#web", "#library", "#js"]}
              keywords={["UI", "FRONTEND"]}
              time="09-04-2026"
              btnContent="Download"
            />
            <NoteCard
              author="Chiku"
              title="Node.js Basics"
              desc="Node from basics to advanced"
              category="web development"
              tags={["#web", "#backend", "#js"]}
              keywords={["HTTP", "API", "REST"]}
              time="09-04-2026"
              btnContent="Download"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
