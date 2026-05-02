import { convertToLocal } from "../utils/utils";

import { FaUserCircle } from "react-icons/fa";

export const NoteCard = ({
  author,
  title,
  desc,
  category,
  time,
  btnContent,
  previewImage,
  handleClick,
}) => {
  return (
    <div className="flex flex-1 flex-col p-4 rounded border">
      {/* content */}

      <span className="font-bold opacity-90 text-xl">
        {title?.toUpperCase()}
      </span>
      <p className="opacity-70">{desc}</p>
      {/* author with note category */}
      <div className="badge badge-soft badge-primary mt-2">
        <span>{category.toUpperCase()}</span>
      </div>

      <div className="relative h-48 w-full border overflow-hidden rounded-xl group mt-2">
        {previewImage ? (
          <img
            src={previewImage}
            alt="preview"
            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-base-200 text-sm opacity-60">
            No Preview
          </div>
        )}

        {/* hover effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <span className="text-white text-sm bg-black/50 px-3 py-1 rounded-lg">
            Preview
          </span>
        </div>
      </div>

      <span className="text-sm my-2 opacity-50">{convertToLocal(time)}</span>
      <span className="badge badge-success text-white mb-2">
        <FaUserCircle className="size-4" />
        {`${author}`}
      </span>
      <div>
        <button className="bg-base-200 text-primary p-1 rounded-full" onClick={handleClick}>
          {btnContent}
        </button>
      </div>
    </div>
  );
};
