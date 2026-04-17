import { convertToLocal } from "../utils/utils"

export const NoteCard = ({author, title, desc, category, tags=[], keywords, time, btnContent, handleClick}) => {
    return(
        <div className="flex flex-col p-4 rounded bg-primary/20">
            {/* content */}
            
                <span className="font-bold opacity-70 text-xl">{title?.toUpperCase()}</span>
                <p className="opacity-70">{desc}</p>
                {/* author with note category */}
                <div className="flex justify-between my-4 opacity-70">
                    <span>{category}</span>
                    <span>{`By ${author}`}</span>
                </div>
            <div className="flex flex-col gap-6">
                <div className="flex gap-2">
                    {tags?.map((tag, index) => (
                        <span className="badge badge-primary px-5 py-4 badge-soft" key={index}>{`#${tag}`}</span>
                    ))}
                </div>
                <div className="flex gap-2">
                    {keywords?.map((keyword, index) => (
                        <span className="badge badge-secondary px-5 py-4 badge-soft" key={index}>{keyword.toUpperCase()}</span>
                    ))}
                </div>
            </div>
            <span className="text-sm my-4 opacity-50">{convertToLocal(time)}</span>
            <button className="btn btn-primary opacity-70" onClick={handleClick}>{btnContent}</button>
            
        </div>
    )
}