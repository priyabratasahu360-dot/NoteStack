import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../api/api";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  HiOutlineCloudArrowUp,
  HiOutlineDocumentText,
  HiOutlineXMark,
  HiOutlineSparkles
} from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const CreateNotePage = () => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);

  const [previewSrc, setPreviewSrc] = useState(null);
  const [file, setFile] = useState(null);

  const [noteData, setNoteData] = useState({
    title: "",
    category: "",
    description: "",
  });

  // Tags
  const handleAddTag = (e) => {
    e?.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagRemove = (indexToRemove) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  // Keywords
  const handleAddKeyword = (e) => {
    e?.preventDefault();
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleKeywordRemove = (indexToRemove) => {
    setKeywords(keywords.filter((_, idx) => idx !== indexToRemove));
  };

  // File Upload Handling
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type.startsWith("image/") || selectedFile.type === "application/pdf") {
      const url = URL.createObjectURL(selectedFile);
      setPreviewSrc(url);
    }
    setFile(selectedFile);
  };

  const { mutate: mutateCreateNoteMutation, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      setNoteData({ title: "", category: "", description: "" });
      setTags([]);
      setKeywords([]);
      setFile(null);
      setPreviewSrc(null);
    },
  });

  const handleUploadNote = (e) => {
    e.preventDefault();
    if (!noteData.title || !noteData.category || !file) {
      alert("Please enter title, category and select a note file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", noteData.title);
    formData.append("category", noteData.category);
    formData.append("description", noteData.description);
    formData.append("tags", JSON.stringify(tags));
    formData.append("keywords", JSON.stringify(keywords));

    mutateCreateNoteMutation(formData);
  };

  return (
    <div className="min-h-screen bg-base-200/40 text-base-content flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="bg-base-100 rounded-3xl border border-base-content/10 shadow-sm p-6 sm:p-10 space-y-8">

          <p className="opacity-50 text-gray-400 text-sm italic">Note: Please use a relevant category name for eg. javascript, mongodb, react, nodejs...</p>
          {/* Header */}
          <div className="border-b border-base-content/10 pb-6 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary mb-2">
                <HiOutlineSparkles className="size-3.5" />
                <span>Share Knowledge</span>
              </div>
              <h2 className="text-2xl font-extrabold text-base-content">
                Create & Publish Note
              </h2>
              <p className="text-xs sm:text-sm text-base-content/60 mt-1">
                Upload your study documents, cheat sheets, or lecture summaries for other students.
              </p>
            </div>
          </div>

          <form onSubmit={handleUploadNote} className="space-y-6">

            {/* Title & Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Note Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating Systems Final Review"
                  value={noteData.title}
                  onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-base-200/70 border border-base-content/10 text-sm focus:bg-base-100 focus:border-primary focus:outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Category / Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Computer Science, Calculus..."
                  value={noteData.category}
                  onChange={(e) => setNoteData({ ...noteData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-base-200/70 border border-base-content/10 text-sm focus:bg-base-100 focus:border-primary focus:outline-none transition"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                Description & Topics Covered
              </label>
              <textarea
                rows={4}
                placeholder="Give a brief summary of what chapters, concepts, or formulas this note covers..."
                value={noteData.description}
                onChange={(e) => setNoteData({ ...noteData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-base-200/70 border border-base-content/10 text-sm focus:bg-base-100 focus:border-primary focus:outline-none transition"
              />
            </div>

            {/* Tags & Keywords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Tags Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Subject Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag(e)}
                    placeholder="e.g. #os, #algorithms"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-base-200/70 border border-base-content/10 text-sm focus:bg-base-100 focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-primary text-primary-content hover:opacity-90 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                      >
                        #{t}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(idx)}
                          className="hover:text-red-500 cursor-pointer"
                        >
                          <HiOutlineXMark className="size-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Keywords Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Search Keywords
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddKeyword(e)}
                    placeholder="e.g. memory, deadlock"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-base-200/70 border border-base-content/10 text-sm focus:bg-base-100 focus:border-secondary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-secondary text-secondary-content hover:opacity-90 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {keywords.map((k, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-secondary/10 text-secondary border border-secondary/20"
                      >
                        {k.toUpperCase()}
                        <button
                          type="button"
                          onClick={() => handleKeywordRemove(idx)}
                          className="hover:text-red-500 cursor-pointer"
                        >
                          <HiOutlineXMark className="size-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* File Upload Drag/Drop Box */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                Upload Document (PDF or Images) <span className="text-red-500">*</span>
              </label>

              <div className="relative border-2 border-dashed border-base-content/20 hover:border-primary/50 rounded-2xl p-6 transition flex flex-col items-center justify-center text-center bg-base-200/30">
                <input
                  type="file"
                  required
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />

                {!file ? (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <HiOutlineCloudArrowUp className="size-8" />
                    </div>
                    <span className="text-sm font-bold text-base-content">
                      Click to browse or drop your document here
                    </span>
                    <span className="text-xs text-base-content/50 mt-1">
                      PDF, PNG, JPG up to 10MB
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-base-100 border border-base-content/10">
                    <HiOutlineDocumentText className="size-8 text-primary" />
                    <div className="text-left">
                      <p className="text-sm font-bold truncate max-w-xs">{file.name}</p>
                      <p className="text-xs text-base-content/60">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg shadow-primary/25 transition disabled:opacity-50 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <AiOutlineLoading3Quarters className="size-5 animate-spin" />
                    <span>Publishing Note...</span>
                  </>
                ) : (
                  <>
                    <HiOutlineCloudArrowUp className="size-5" />
                    <span>Publish Note to Community</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </main>
      <Footer />
    </div>
  );
};
