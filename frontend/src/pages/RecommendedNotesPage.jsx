import { IoMdDownload } from "react-icons/io"

export const RecommendedNotesPage = () => {
    return(
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md">
                  <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
                    Recommended Notes
                  </li>
            
                  <li className="list-row flex justify-between">
                    <div className="flex flex-col gap-2">
                        <span>Note Title</span>
                        <p>Lorem, iia quasi blanditiis similique libero. Dolore id quisquaptio reprehenderit quas delectus perspiciaibus dolores. Ducimus, animi! Culpa.</p>
                        <div className="flex gap-2 opacity-70">
                        <span>Chiku sahu</span>
                        <span>12:30 PM</span>
                        </div>
                    </div>
                    <div>
                    <button className="btn btn-primary">
                        <IoMdDownload className="size-5"/>
                    </button>{/* download note button */}
                    </div>
                  </li>
            
                   <li className="list-row flex justify-between">
                    <div className="flex flex-col gap-2">
                        <span>Note Title</span>
                        <p>Lorem, iia quasi blanditiis similique libero. Dolore id quisquaptio reprehenderit quas delectus perspiciaibus dolores. Ducimus, animi! Culpa.</p>
                        <div className="flex gap-2 opacity-70">
                        <span>Sonu sahu</span>
                        <span>12:30 PM</span>
                        </div>
                    </div>
                    <div>
                    <button className="btn btn-primary">
                        <IoMdDownload className="size-5"/>
                    </button>{/* download note button */}
                    </div>
                  </li>
            
                   <li className="list-row flex justify-between">
                    <div className="flex flex-col gap-2">
                        <span>Note Title</span>
                        <p>Lorem, iia quasi blanditiis similique libero. Dolore id quisquaptio reprehenderit quas delectus perspiciaibus dolores. Ducimus, animi! Culpa.</p>
                        <div className="flex gap-2 opacity-70">
                        <span>Babul sahu</span>
                        <span>12:30 PM</span>
                        </div>
                    </div>
                    <div>
                    <button className="btn btn-primary">
                        <IoMdDownload className="size-5"/>
                    </button>{/* download note button */}
                    </div>
                  </li>
                </ul>
        </div>
    )
}