import { MdDelete } from "react-icons/md";
import { Sidebar } from "../components/Sidebar";
import { FaReact } from "react-icons/fa";
import { RiNodejsLine } from "react-icons/ri";
import { TbBrandCSharp } from "react-icons/tb";
import { NoteCard } from "../components/NoteCard";

export const UploadedNotesPage = () => {
  return (
    <>
      <Sidebar heading="Uploads" />
      <div className="m-5">
        <p className="py-5 text-2xl opacity-60 tracking-wide">Uploaded Notes</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <NoteCard
            author="miku"
            title="react"
            desc="react from basics to advanced"
            category="web development"
            tags={["#web", "#library", "#js"]}
            keywords={["UI", "FRONTEND"]}
            time="09-04-2026"
            btnContent="View"
          />
          <NoteCard
            author="Chiku"
            title="Node.js Basics"
            desc="Node from basics to advanced"
            category="web development"
            tags={["#web", "#backend", "#js"]}
            keywords={["HTTP", "API", "REST"]}
            time="09-04-2026"
            btnContent="View"
          />
        </div>
      </div>
    </>
  );
};
