import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateProfile, getAuthUser } from "../api/api";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  HiOutlineCamera,
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineTag,
  HiOutlineXMark,
  HiOutlineCheck,
  HiOutlineSparkles
} from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const ProfilePage = () => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);

  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });

  // Sync initial user tags into local state
  useState(() => {
    if (authUser?.notePreferences) {
      setTags(authUser.notePreferences);
    }
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setImage(reader.result);
    };
  };

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.invalidateQueries({ queryKey: ["recommendedNotes"] });
    },
  });

  const handleSaveChanges = (e) => {
    e.preventDefault();
    updateProfileMutation({
      profilePhoto: image || authUser?.profilePhoto,
      notePreferences: tags,
    });
  };

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

  return (
    <div className="min-h-screen bg-base-200/40 text-base-content flex flex-col">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-6">

        {/* Profile Card */}
        <div className="bg-base-100 rounded-3xl border border-base-content/10 shadow-sm p-6 sm:p-10 space-y-8">

          {/* Header & Avatar */}
          <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-base-content/10 pb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary shadow-md bg-base-300 flex items-center justify-center">
                {image || authUser?.profilePhoto ? (
                  <img
                    src={image || authUser?.profilePhoto}
                    alt={authUser?.userName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-extrabold text-primary">
                    {authUser?.userName?.[0]?.toUpperCase() || "U"}
                  </span>
                )}
              </div>

              {/* Upload trigger overlay */}
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-content shadow-md cursor-pointer hover:opacity-90 transition"
                title="Change Avatar"
              >
                <HiOutlineCamera className="size-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-extrabold text-base-content">
                {authUser?.userName || "Your Profile"}
              </h2>
              <p className="text-xs sm:text-sm text-base-content/60">
                {authUser?.email || "No email connected"}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                  <HiOutlineSparkles className="size-3.5" />
                  <span>Student Contributor</span>
                </span>
              </div>
            </div>
          </div>

          {/* Form details */}
          <form onSubmit={handleSaveChanges} className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled
                    value={authUser?.userName || ""}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-200/50 border border-base-content/10 text-sm opacity-80 cursor-not-allowed"
                  />
                  <HiOutlineUser className="absolute left-3.5 top-3 size-4 text-base-content/40" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled
                    value={authUser?.email || ""}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-200/50 border border-base-content/10 text-sm opacity-80 cursor-not-allowed"
                  />
                  <HiOutlineEnvelope className="absolute left-3.5 top-3 size-4 text-base-content/40" />
                </div>
              </div>
            </div>

            {/* Note Preferences / Recommendation Tags */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Study Interests & Recommended Subjects
                </label>
                <p className="text-xs text-base-content/60 mt-0.5">
                  We customize your dashboard recommendations using these topics.
                </p>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag(e)}
                    placeholder="e.g. #algorithms, #biology, #calculus"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-200/70 border border-base-content/10 text-sm focus:bg-base-100 focus:border-primary focus:outline-none"
                  />
                  <HiOutlineTag className="absolute left-3.5 top-3 size-4 text-base-content/40" />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-primary hover:opacity-90 text-primary-content transition cursor-pointer"
                >
                  Add Topic
                </button>
              </div>

              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(idx)}
                        className="hover:text-red-500 transition cursor-pointer"
                      >
                        <HiOutlineXMark className="size-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-base-content/50 italic">
                  No topic preferences added yet.
                </p>
              )}
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-base-content/10">
              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-primary to-secondary text-primary-content shadow-md shadow-primary/20 transition active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <AiOutlineLoading3Quarters className="size-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <HiOutlineCheck className="size-4" />
                    <span>Save Changes</span>
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
