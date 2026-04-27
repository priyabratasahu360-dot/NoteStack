import { convertToLocal } from "../utils/utils";

export const NoteCard = ({
  author,
  title,
  desc,
  category,
  tags = [],
  keywords,
  time,
  btnContent,
  previewImage,
  handleClick,
}) => {
  return (
    <div className="flex flex-col p-4 rounded">
      {/* content */}

      <span className="font-bold opacity-70 text-xl">
        {title?.toUpperCase()}
      </span>
      <p className="opacity-70">{desc}</p>
      {/* author with note category */}
      <div className="flex justify-between my-4 opacity-70">
        <span>{category}</span>
        <span>{`By ${author}`}</span>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-2">
          {tags?.map((tag, index) => (
            <span
              className="badge badge-primary px-5 py-4 badge-soft"
              key={index}
            >{`#${tag}`}</span>
          ))}
        </div>
        <div className="flex gap-2">
          {keywords?.map((keyword, index) => (
            <span
              className="badge badge-secondary px-5 py-4 badge-soft"
              key={index}
            >
              {keyword.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="relative h-48 w-full overflow-hidden rounded-xl group mt-4">
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

      <span className="text-sm my-4 opacity-50">{convertToLocal(time)}</span>
      <button className="btn btn-primary opacity-70" onClick={handleClick}>
        {btnContent}
      </button>
    </div>
  );
};
