import { Link, useSearchParams } from "react-router-dom";
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
  HiOutlineStar
} from "react-icons/hi2";
import { useState } from "react";

export const HomePage = () => {
  const [params] = useSearchParams();
  const query = params.get("query");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: searchedNotes, isLoading: isSearchLoading } = useQuery({
    queryKey: ["searchedNoteData", query],
    queryFn: () => getSearchedNotes(query),
    enabled: !!query,
  });

  // Fetch all notes (with limit 50) to derive featured top downloaded & top liked
  const { data: allNotesData, isLoading: isAllNotesLoading } = useQuery({
    queryKey: ["allNotesFeatured"],
    queryFn: () => getAllAvailableNotes(1, 50),
    enabled: !query,
  });

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });

  const categories = ["All", "Computer Science", "Engineering", "Mathematics", "Medical", "Business", "Physics"];

  const rawNotes = allNotesData?.notes || [];

  // Sort by highest downloads and highest likes to populate Featured section
  const topDownloadedNotes = [...rawNotes]
    .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
    .slice(0, 3);

  const topLikedNotes = [...rawNotes]
    .sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
    .slice(0, 3);

  const filteredNotes = rawNotes.filter((n) => {
    if (activeCategory === "All") return true;
    return n.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const displayList = query ? searchedNotes?.notes || [] : filteredNotes;

  return (
    <div className="min-h-screen bg-base-200/40 text-base-content flex flex-col">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-base-content/10 bg-gradient-to-b from-primary/10 via-base-100 to-base-200/50">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6 shadow-xs">
            <HiOutlineSparkles className="size-4" />
            <span>Community-Driven Student Knowledge Hub</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Master Your Studies with{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              High-Yield Notes
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            NoteStack allows authenticated learners and educators to upload, organize, bookmark, and download study materials seamlessly.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {!authUser ? (
              <>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>Start Sharing Free</span>
                  <HiOutlineArrowRight className="size-4" />
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-base-100 border border-base-content/15 hover:bg-base-200 text-base-content transition-all shadow-xs"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/note"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-primary text-primary-content shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Go to Dashboard</span>
                <HiOutlineArrowRight className="size-4" />
              </Link>
            )}
          </div>

          {/* Value Propositions */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-base-100/70 border border-base-content/10 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                <HiOutlineAcademicCap className="size-5" />
              </div>
              <h4 className="font-bold text-sm">Peer Verified</h4>
              <p className="text-xs text-base-content/60 mt-0.5">Community ratings and upvotes.</p>
            </div>

            <div className="p-4 rounded-2xl bg-base-100/70 border border-base-content/10 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-2">
                <HiOutlineArrowDownTray className="size-5" />
              </div>
              <h4 className="font-bold text-sm">Direct PDF Downloads</h4>
              <p className="text-xs text-base-content/60 mt-0.5">High-speed reliable downloads.</p>
            </div>

            <div className="p-4 rounded-2xl bg-base-100/70 border border-base-content/10 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-2">
                <HiOutlineShieldCheck className="size-5" />
              </div>
              <h4 className="font-bold text-sm">Secure Authentication</h4>
              <p className="text-xs text-base-content/60 mt-0.5">Google OAuth & encrypted sessions.</p>
            </div>

            <div className="p-4 rounded-2xl bg-base-100/70 border border-base-content/10 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                <HiOutlineHeart className="size-5" />
              </div>
              <h4 className="font-bold text-sm">Personalized Feed</h4>
              <p className="text-xs text-base-content/60 mt-0.5">Smart recommendations by tags.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Notes Section (Most Downloaded & Most Liked) */}
      {!query && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-base-content/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold mb-1.5">
                <HiOutlineFire className="size-4" />
                <span>Community Highlights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
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
                <div key={n} className="h-20 rounded-2xl bg-base-100 border border-base-content/10 animate-pulse" />
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
            <h2 className="text-2xl font-extrabold tracking-tight">
              {query ? `Search Results for "${query}"` : "All Listed Notes"}
            </h2>
            <p className="text-xs sm:text-sm text-base-content/60 mt-1">
              {query 
                ? `Found ${displayList.length} notes matching your query`
                : "Browse community documents by category or search term"}
            </p>
          </div>

          {/* Category Filter Pills (when not searching) */}
          {!query && (
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    activeCategory === cat
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
        {(query ? isSearchLoading : isAllNotesLoading) ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-base-100 border border-base-content/10 animate-pulse p-4" />
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
            <p className="text-sm text-base-content/60 mt-1 max-w-sm mx-auto">
              {query 
                ? "Try searching for a different keyword or check your spelling."
                : "No notes are currently available in this category."}
            </p>
            {authUser && (
              <Link
                to="/upload"
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-content shadow-sm"
              >
                Upload a Note
              </Link>
            )}
          </div>
        )}

      </section>

    </div>
  );
};
