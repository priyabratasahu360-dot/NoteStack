import { BsExclamationTriangleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export const NoContent = () => {
    return(
        <div className="flex w-full border p-5 rounded-lg opacity-70 bg-animate-pulse">
            <div className="flex flex-col w-full justify-center items-center gap-3">
                <BsExclamationTriangleFill className="size-10 text-yellow-500"/>
                <p className="opacity-70">You have not uploaded any notes yet</p>

                <div className="flex gap-2 text-lg">
                    <p>To upload your first ever note</p>
                    <Link to={"/upload"} className="text-blue-600 underline">
                    click here
                    </Link>
                </div>
            </div>
        </div>
    )
}