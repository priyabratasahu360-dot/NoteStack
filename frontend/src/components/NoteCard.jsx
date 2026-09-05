import { convertToLocal } from "../utils/utils";
import { 
  HiOutlineHandThumbUp, 
  HiHandThumbUp,
  HiOutlineArrowDownTray,
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineUser
} from "react-icons/hi2";

export const NoteCard = ({
  author,
  title,
  desc,
  category,
  time,
  btnContent,
  previewImage,
  handleClick,
  downloads = 0,
  likes = 0,
  handleLike,
  isLiked = false,
  tags = [],
  highlightRank = null, // e.g. "Top Downloaded" or "Most Liked"
}) => {
  return (
    <div className="file-row w-full rounded-xl sm:rounded-2xl bg-base-100 border border-base-content/10 px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between gap-3 shadow-xs">
      
      {/* Left: Compact Document Icon/Thumb + Title & Metadata in a tight horizontal bar */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        
        {/* Document Icon / Small Thumbnail */}
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          {previewImage ? (
            <img
              src={previewImage}
              alt={title || "Note"}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <HiOutlineDocumentText className="size-5 sm:size-6 text-primary" />
          )}

          {highlightRank && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
          )}
        </div>

        {/* Text Details - Single/Compact Line Hierarchy */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {highlightRank && (
              <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase bg-accent/20 text-accent rounded shrink-0">
                {highlightRank}
              </span>
            )}
            <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase bg-primary/10 text-primary rounded shrink-0">
              {category || "General"}
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-base-content leading-snug truncate hover:text-primary transition-colors">
              {title || "Untitled Note"}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-base-content/60 mt-0.5">
            <span className="truncate max-w-[100px] sm:max-w-[150px] inline-flex items-center gap-1">
              <HiOutlineUser className="size-3 text-primary shrink-0" />
              <span className="truncate">{author || "Community"}</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 shrink-0">
              <HiOutlineCalendar className="size-3 shrink-0" />
              <span>{time ? convertToLocal(time) : "Recent"}</span>
            </span>

            {desc && (
              <span className="hidden md:inline truncate text-base-content/50 max-w-sm">
                — {desc}
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Right: Small Compact Bar with Counts and Action Button */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        
        {/* Download counter */}
        <div className="flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg bg-base-200 text-base-content/70" title="Downloads">
          <HiOutlineArrowDownTray className="size-3.5 text-primary" />
          <span>{downloads}</span>
        </div>

        {/* Like counter & button */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg border transition cursor-pointer ${
            isLiked
              ? "bg-accent/15 text-accent border-accent/30"
              : "bg-base-200 text-base-content/70 hover:bg-base-300 border-transparent"
          }`}
          title={isLiked ? "Unlike" : "Like"}
        >
          {isLiked ? (
            <HiHandThumbUp className="size-3.5 text-accent" />
          ) : (
            <HiOutlineHandThumbUp className="size-3.5" />
          )}
          <span>{likes}</span>
        </button>

        {/* Action Button */}
        <div>
          <button
            onClick={handleClick}
            className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-bold bg-primary hover:opacity-90 text-primary-content shadow-xs transition active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {btnContent || (
              <>
                <HiOutlineArrowDownTray className="size-3.5" />
                <span className="hidden sm:inline">Download</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
