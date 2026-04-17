import { IoOpen } from "react-icons/io5";
import { Sidebar } from "../components/Sidebar";
import { NoteCard } from "../components/NoteCard";
import { useQuery } from "@tanstack/react-query";

import { showAllDownloadedNotes } from "../api/api";

export const DownloadedNotesPage = () => {
  const { data: downloadedNotes } = useQuery({
    queryKey: ["downloadedNote"],
    queryFn: showAllDownloadedNotes,
  });
  console.log(downloadedNotes);
  return (
    <>
      <Sidebar heading="Downloads" />
      <div className="m-5">
        <p className="py-5 text-2xl opacity-60 tracking-wide">
          Downloaded Notes
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {downloadedNotes?.downloadedNotes.length > 0
            ? downloadedNotes?.downloadedNotes.map((note, index) => (
                <NoteCard
                  key={index}
                  author={note.noteId.authorId.userName}
                  title={note.noteId.title}
                  desc={note.noteId.description}
                  category={note.noteId.category}
                  tags={note.noteId.tags}
                  keywords={note.noteId.keywords}
                  time={note.createdAt}
                  btnContent="View"
                />
              ))
            : "No downloaded notes available"}
        </div>
      </div>
    </>
  );
};
