//EXTERNAL LIBRARIES
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//API FUNCTIONS
import { updateProfile, getAuthUser } from "../api/api";

//PAGE COMPONENTS
import { Sidebar } from "../components/Sidebar";

//ASSETS (Icons)
import { FaCamera } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const ProfilePage = () => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const [image, setImage] = useState(null);

  const queryClient = useQueryClient();

  const { data: authUser, isPending } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });
  // console.log(authUser);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setImage(base64Image);
    };
  };

  const { mutate: updateProfileMutation } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleSaveChanges = (e) => {
    e.preventDefault();
    updateProfileMutation({
      profilePhoto: image,
      notePreferences: tags,
    });
  };

  const handleAddTag = () => {
    setTags([...tags, tagInput]);
    setTagInput("");
  };

  const handleTagRemove = (toRemove) => {
    setTags(tags.filter((_, index) => index !== toRemove));
  };

  return (
    <>
      <Sidebar />
      <div className="flex justify-center">
        <div className="flex flex-col gap-8 h-screen items-center w-full lg:max-w-4xl m-4">
          <h1 className="w-full text-center text-2xl font-bold border p-4 rounded-lg">
            Profile Data
          </h1>
          <div className="avatar relative">
            <div className="w-24 rounded-full">
              <img
                src={authUser?.profilePhoto}
                alt="profile"
                className="avatar bg-gray-400"
              />
            </div>
            <label htmlFor="avatar-input">
              <FaCamera className="absolute bottom-0 right-3 size-5" />
              <input
                type="file"
                accept="image/*"
                id="avatar-input"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          {/* info fields */}
          <ul className="list w-full">
            <li className="list w-full opacity-70 flex gap-8">
              {/* username */}
              <label>
                Username
                <div className="input w-full">{authUser?.userName}</div>{" "}
              </label>

              {/* email */}
              <label>
                Email
                <div className="input w-full">{authUser?.email}</div>{" "}
              </label>

              <div className="flex flex-col gap-2">
                <p className="font-bold">Preferences</p>
                <div className="flex gap-2">
                {authUser ? (
                  authUser.notePreferences.map((tag, index) => (
                    <span className="badge badge-primary" key={index}>{tag}</span>
                  ))) : ""}
                  </div>
              </div>

              {/* tags */}
              <label>
                <div className="flex flex-col">
                  <span>Add tags</span>
                  <div className="flex gap-2 my-3">
                    {tags.map((tag, index) => (
                      <ul key={index} className="flex badge badge-primary">
                        <li>{`#${tag.toUpperCase()}`}</li>
                        <button onClick={() => handleTagRemove(index)}>
                          x
                        </button>
                      </ul>
                    ))}
                  </div>
                  <div className="w-full flex">
                    <input
                      className="input w-full"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />{" "}
                    <button className="btn btn-primary" onClick={handleAddTag}>
                      Add
                    </button>
                  </div>
                </div>
              </label>
            </li>
          </ul>

          {/* submit button */}
          <button className="btn w-full bg-primary" onClick={handleSaveChanges} disabled={isPending}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};
