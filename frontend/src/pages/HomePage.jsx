import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAuthUser, getSearchedNotes, getAllAvailableNotes } from "../api/api";
import { NoteCard } from "../components/NoteCard";
import {
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineMagnifyingGlass,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineArrowDownTray,
  HiOutlineHeart,
  HiOutlineFire,
  HiOutlineXMark
} from "react-icons/hi2";
import { useState, useEffect } from "react";

export const HomePage = () => {
  const [params] = useSearchParams();
  const queryParam = params.get("query") || "";
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState(queryParam);
  const [activeCategory, setActiveCategory] = useState("All");

  // Keep searchInput synced if URL query changes
  useEffect(() => {
    setSearchInput(queryParam);
  }, [queryParam]);

  const { data: searchedNotes, isLoading: isSearchLoading } = useQuery({
    queryKey: ["searchedNoteData", queryParam],
    queryFn: () => getSearchedNotes(queryParam),
    enabled: !!queryParam,
  });

  // Fetch all notes (with limit 50) to derive featured top downloaded & top liked
  const { data: allNotesData, isLoading: isAllNotesLoading } = useQuery({
    queryKey: ["allNotesFeatured"],
    queryFn: () => getAllAvailableNotes(1, 50),
    enabled: !queryParam,
  });

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      navigate(`/?query=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/");
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    navigate("/");
  };

  const categories = ["All", "Computer Science", "Engineering", "Mathematics", "Medical", "Business", "Physics"];

  const rawNotes = allNotesData?.notes || [];

  // Top downloaded & top liked for Featured Section
  const topDownloadedNotes = [...rawNotes]
    .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
    .slice(0, 3);

  const filteredNotes = rawNotes.filter((n) => {
    if (activeCategory === "All") return true;
    return n.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const displayList = queryParam ? searchedNotes?.notes || [] : filteredNotes;

  return (
    <div className="min-h-screen bg-base-200/40 text-base-content flex flex-col">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 md:pt-20 md:pb-20 border-b border-base-content/10 bg-gradient-to-b from-primary/10 via-base-100 to-base-200/50">

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5 shadow-xs">
            <HiOutlineSparkles className="size-4" />
            <span>Community-Driven Student Knowledge Hub</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-[1.15]">
            Master Your Studies with{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              High-Yield Notes
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-xs sm:text-base text-base-content/70 max-w-xl mx-auto leading-relaxed">
            NoteStack allows authenticated learners and educators to upload, organize, bookmark, and download study materials seamlessly.
          </p>

          {/* Prominent Large Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex flex-col sm:flex-row items-center gap-2 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-base-100 border border-base-content/15 shadow-lg shadow-primary/5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all"
            >
              <div className="relative flex-1 w-full flex items-center">
                <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by title, subject, category or #tags..."
                  className="w-full pl-11 pr-9 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm bg-transparent focus:outline-none placeholder:text-base-content/40"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-base-200 text-base-content/40 hover:text-base-content transition cursor-pointer"
                    title="Clear search"
                  >
                    <HiOutlineXMark className="size-4" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold bg-primary hover:opacity-95 text-primary-content shadow-sm transition active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Search Notes
              </button>
            </form>
          </div>

          {/* Value Propositions */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-base-100/70 border border-base-content/10 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                <HiOutlineAcademicCap className="size-5" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm">Best for students</h4>
              <p className="text-[11px] sm:text-xs text-base-content/60 mt-0.5">Notes across all different categories.</p>
            </div>

            <div className="p-4 rounded-2xl bg-base-100/70 border border-base-content/10 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-2">
                <HiOutlineArrowDownTray className="size-5" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm">Direct PDF Downloads</h4>
              <p className="text-[11px] sm:text-xs text-base-content/60 mt-0.5">High-speed reliable downloads.</p>
            </div>

            <div className="p-4 rounded-2xl bg-base-100/70 border border-base-content/10 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-2">
                <HiOutlineShieldCheck className="size-5" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm">Secure Authentication</h4>
              <p className="text-[11px] sm:text-xs text-base-content/60 mt-0.5">Google OAuth & encrypted sessions.</p>
            </div>

            <div className="p-4 rounded-2xl bg-base-100/70 border border-base-content/10 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                <HiOutlineHeart className="size-5" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm">Personalized Feed</h4>
              <p className="text-[11px] sm:text-xs text-base-content/60 mt-0.5">Smart recommendations by tags.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Notes Section (Most Downloaded & Most Liked) */}
      {!queryParam && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-base-content/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold mb-1.5">
                <HiOutlineFire className="size-4" />
                <span>Community Highlights</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-base-content">
                Featured Study Notes
              </h2>
              <p className="text-xs sm:text-sm text-base-content/60">
                Most downloaded and top rated materials curated by the student community
              </p>
            </div>
          </div>

          {/* Top Downloaded Highlights */}
          {isAllNotesLoading ? (
            <div className="space-y-3">
              {[1, 2].map((n) => (
                <div key={n} className="h-16 rounded-2xl bg-base-100 border border-base-content/10 animate-pulse" />
              ))}
            </div>
          ) : topDownloadedNotes.length > 0 ? (
            <div className="space-y-3">
              {topDownloadedNotes.map((note, idx) => (
                <NoteCard
                  key={note._id || idx}
                  author={note.authorId?.userName || "Anonymous"}
                  title={note.title}
                  desc={note.description}
                  category={note.category}
                  tags={note.tags}
                  keywords={note.keywords}
                  time={note.createdAt}
                  previewImage={note.previewImage}
                  downloads={note.downloads || 0}
                  likes={note.likesCount || 0}
                  isLiked={note.isLiked}
                  highlightRank={idx === 0 ? "🔥 #1 Most Downloaded" : "⭐ Popular"}
                  handleClick={() => {
                    if (!authUser) {
                      window.location.href = "/login";
                    } else if (note.fileUrl) {
                      window.open(note.fileUrl, "_blank");
                    }
                  }}
                />
              ))}
            </div>
          ) : null}
        </section>
      )}

      {/* Main Content Area: Search / Browse Notes List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {queryParam ? `Search Results for "${queryParam}"` : "All Listed Notes"}
              </h2>
              {queryParam && (
                <button
                  onClick={handleClearSearch}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  (Clear filter)
                </button>
              )}
            </div>
            <p className="text-xs sm:text-sm text-base-content/60 mt-1">
              {queryParam
                ? `Found ${displayList.length} notes matching "${queryParam}"`
                : "Browse community documents by category or search term"}
            </p>
          </div>

          {/* Category Filter Pills (when not searching) */}
          {!queryParam && (
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${activeCategory === cat
                      ? "bg-primary text-primary-content shadow-sm"
                      : "bg-base-100 border border-base-content/10 text-base-content/70 hover:bg-base-200"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Listed Notes or Loading/Empty State */}
        {(queryParam ? isSearchLoading : isAllNotesLoading) ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 rounded-2xl bg-base-100 border border-base-content/10 animate-pulse p-4" />
            ))}
          </div>
        ) : displayList.length > 0 ? (
          <div className="space-y-3">
            {displayList.map((note, index) => (
              <NoteCard
                key={note._id || index}
                author={note.authorId?.userName || "Anonymous"}
                title={note.title}
                desc={note.description}
                category={note.category}
                tags={note.tags}
                keywords={note.keywords}
                time={note.createdAt}
                previewImage={note.previewImage}
                downloads={note.downloads || 0}
                likes={note.likesCount || 0}
                isLiked={note.isLiked}
                handleClick={() => {
                  if (!authUser) {
                    window.location.href = "/login";
                  } else if (note.fileUrl) {
                    window.open(note.fileUrl, "_blank");
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-base-100 rounded-3xl border border-base-content/10 max-w-xl mx-auto p-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <HiOutlineMagnifyingGlass className="size-8" />
            </div>
            <h3 className="text-lg font-bold">No notes found</h3>
            <p className="text-xs sm:text-sm text-base-content/60 mt-1 max-w-sm mx-auto">
              {queryParam
                ? `No results for "${queryParam}". Try searching for another topic or tag.`
                : "No notes are currently available in this category."}
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              {queryParam && (
                <button
                  onClick={handleClearSearch}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-base-content/15 hover:bg-base-200"
                >
                  View All Notes
                </button>
              )}
              {authUser && (
                <Link
                  to="/upload"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-content shadow-sm"
                >
                  Upload a Note
                </Link>
              )}
            </div>
          </div>
        )}

      </section>

    </div>
  );
};
