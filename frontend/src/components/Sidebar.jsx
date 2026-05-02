//EXTERNAL LIBRARIE AND TOOL
import { Link } from "react-router-dom";

//ASSETS(Icons)
import { PiListDashesFill } from "react-icons/pi";
import { MdFileUpload } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { RxDashboard } from "react-icons/rx";
import { FaPlusCircle } from "react-icons/fa";

export const Sidebar = ({heading}) => {
  const linkItemsWithIcons = [
    {to: "/note", text: "Dashboard", icon: <RxDashboard className="size-4"/>},
    {to: "/uploaded", text: "Uploads", icon: <MdFileUpload className="size-6"/>},
    {to: "/upload", text: "Create", icon: <FaPlusCircle className="size-4.5"/>},
    {to: "/downloads", text: "Downloads", icon: <IoMdDownload className="size-6"/>}
  ]
  return (
    <div className="drawer sticky top-0 z-1">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <PiListDashesFill className="size-8" />
            </label>
          </div>
          <div>
            <Link to={"/"} className="btn">
              <TiHome className="size-5" />
              Home
            </Link>
          </div>
          <div className="mx-2 flex-1 px-2 btn">{heading}</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal gap-4">
              {/* Navbar menu content */}
              <Link to={"/note"} className="btn">
                <RxDashboard className="size-5" />
                Dashboard
              </Link>{" "}
              <Link to={"/uploaded"} className="btn">
                <MdFileUpload className="size-5" />
                Uploads
              </Link>{" "}
              {/* link to uploaded notes by you */}
              <Link to={"/upload"} className="btn">
                <IoIosCreate className="size-5" />
                Create
              </Link>{" "}
              {/* link to all create note page*/}
              <Link to={"/downloads"} className="btn">
                <IoMdDownload className="size-5" />
                Downloads
              </Link>
              {/* all downloaded notes */}
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="tabs tabs-box flex flex-col bg-base-200 min-h-full w-80 p-4 relative">
          {/* Sidebar content here */}
          {
            linkItemsWithIcons.map((item, index) => (
              <Link to={item.to} key={index} className="bg-base-200 text-base-content">
                <div className="flex items-center">
                  <span className="size-8 flex items-center justify-center">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              </Link>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
