import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { GoFileDirectoryFill } from "react-icons/go";
import { MdFileUpload } from "react-icons/md";

export const CreateNotePage = () => {
  const [tagInput, setTagInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [tags, setTags] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const handleAddTag = (e) => {
    e.preventDefault();
    setTags([...tags, tagInput]);
    setTagInput("");
  };

  const handleAddKeyword = (e) => {
    e.preventDefault();
    setKeywords([...keywords, keywordInput]);
    setKeywordInput("");
  }
  const handleTagRemove = (toRemove) => {
    setTags(tags.filter((_, index) => index !== toRemove));
  };
  const handleKeywordRemove = (toRemove) => {
    setKeywords(keywords.filter((_, index) => index !== toRemove));
  };
  return (
    <div>
      <Sidebar heading="Create" />
      <div className="flex justify-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 m-5 flex flex-col items-center lg:max-w-[800px]">
          <legend className="fieldset-legend text-xl opacity-70">
            Note details
          </legend>

          <div className="w-full">
            <label className="label">Title</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Note title"
            />
          </div>
          <div className="w-full">
            <label className="label">Category</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Add a unique category"
            />
          </div>
          <div className="w-full">
            <fieldset className="fieldset">
              <label className="label">Description</label>
              <textarea
                className="textarea h-24 w-full"
                placeholder="Type here...."
              ></textarea>
            </fieldset>
          </div>
          <div className="w-full">
            <ul className="flex gap-2 my-3">
              {tags.map((tag, index) => (
                <div key={index} className="flex badge badge-primary">
                  <li>{`#${tag}`}</li>
                  <button onClick={() => handleTagRemove(index)}>x</button>
                </div>
              ))}
            </ul>
            <div className="flex">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                type="text"
                className="input w-full"
                placeholder="Add tags"
              />
              <button className="btn btn-primary" onClick={handleAddTag}>
                Add
              </button>
            </div>
          </div>
            {/* keywords */}
            <div className="w-full mb-5">
            <ul className="flex gap-2 my-3">
              {keywords.map((keyword, index) => (
                <div key={index} className="flex badge badge-primary">
                  <li>{keyword.toUpperCase()}</li>
                  <button onClick={() => handleKeywordRemove(index)}>x</button>
                </div>
              ))}
            </ul>
            <div className="flex">
              <input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                type="text"
                className="input w-full"
                placeholder="Add Keywords"
              />
              <button className="btn btn-primary" onClick={handleAddKeyword}>
                Add
              </button>
            </div>
          </div>
          <div className="h-50 w-full input flex justify-center relative">
            <GoFileDirectoryFill className="size-20 absolute top-8 opacity-70" />
            <input
              type="file"
              className="file-input file-input-primary absolute bottom-5"
            />
          </div>
          <div className="w-full">
            <button className="btn bg-primary w-full flex gap-1">
              <MdFileUpload className="size-5" />
              Upload
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};
