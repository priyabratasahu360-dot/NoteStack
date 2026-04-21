////LIBRARIES & EXTERNAL TOOLS
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

//API FUNCTIONS
import { createNote } from "../api/api";

//PAGE COMPONENTS
import { Sidebar } from "../components/Sidebar";

//ASSETS (Icons)
import { GoFileDirectoryFill } from "react-icons/go";
import { MdFileUpload } from "react-icons/md";

export const CreateNotePage = () => {

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);

  const [src, setSrc] = useState(null);


  const [noteData, setNoteData] = useState({
    title: "",
    category: "",
    description: "",
  })

  const [file, setFile] = useState(null);

  
  ///----------TAGS & KEYWORDS--------///
  const handleAddTag = (e) => {
    e.preventDefault();
    setTags([...tags, tagInput]);
    setTagInput("");
  };
  const handleTagRemove = (toRemove) => {
    setTags(tags.filter((_, index) => index !== toRemove));
  };
  
  const handleAddKeyword = (e) => {
    e.preventDefault();
    setKeywords([...keywords, keywordInput]);
    setKeywordInput("");
  }
  const handleKeywordRemove = (toRemove) => {
    setKeywords(keywords.filter((_, index) => index !== toRemove));
  };
  ///--------------------------------///


  ///---------FILE UPLOAD-----------///
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if(selectedFile.type.startsWith("image/")){
      const url = URL.createObjectURL(selectedFile);
      setSrc(url);
    }
    if(selectedFile.type ===  "application/pdf"){
      const url = URL.createObjectURL(selectedFile);
      setSrc(url);

    }
    setFile(selectedFile);
  }
  const {mutate: mutateCreateNoteMutation} = useMutation({
    mutationFn: createNote
  });
  
  const handleUploadNote = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", noteData.title);
    formData.append("category", noteData.category);
    formData.append("description", noteData.description);

    formData.append("tags", JSON.stringify(tags));
    formData.append("keywords", JSON.stringify(keywords));

    mutateCreateNoteMutation(formData);
  }
  ///------------------------------///
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
              value={noteData.title}
              onChange={(e) => setNoteData({...noteData, title: e.target.value})}
              className="input w-full"
              placeholder="Note title"
            />
          </div>
          <div className="w-full">
            <label className="label">Category</label>
            <input
              type="text"
              value={noteData.category}
              onChange={(e) => setNoteData({...noteData, category: e.target.value})}
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
                value={noteData.description}
                onChange={(e) => setNoteData({...noteData, description: e.target.value})}
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
            {!file ? 
            <GoFileDirectoryFill className="size-20 absolute top-8 opacity-70" /> : ""
            }
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input file-input-primary absolute bottom-5"
            />
            <div>
              {!src && <p className="mt-6">Choose a file to upload</p>}
              {file && file.type.startsWith("image/") && (
                <img src={src} alt="image preview" className="object-contain size-40 mb-4"/>
              )}

              {file && file.type === "application/pdf" && (
                <iframe src={src} frameborder="0"></iframe>
              )}
            </div>
          </div>
          <div className="w-full">
            <button className="btn bg-primary w-full flex gap-1" onClick={handleUploadNote}>
              <MdFileUpload className="size-5" />
              Upload
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};
