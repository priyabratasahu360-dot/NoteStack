import { Link } from "react-router-dom";
import { HiOutlineDocumentPlus, HiOutlineCloudArrowUp } from "react-icons/hi2";

export const NoContent = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-base-100 border border-base-content/10 shadow-xs max-w-lg mx-auto my-12">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4">
        <HiOutlineCloudArrowUp className="size-8" />
      </div>

      <h3 className="text-xl font-extrabold text-base-content">
        No notes published yet
      </h3>

      <p className="text-sm text-base-content/60 mt-1.5 max-w-sm">
        You haven't uploaded any study notes yet. Share your knowledge with other students and earn community upvotes!
      </p>

      <Link
        to="/upload"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/20 transition hover:scale-105 active:scale-95"
      >
        <HiOutlineDocumentPlus className="size-4" />
        <span>Create Your First Note</span>
      </Link>
    </div>
  );
};