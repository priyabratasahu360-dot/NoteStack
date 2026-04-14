import { TfiAlignLeft } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useState } from "react";

import { RxDashboard } from "react-icons/rx";
import { FaCircleExclamation } from "react-icons/fa6";
import { MdContactMail } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

import { logout } from "../api/api";

export const Navbar = () => {
  const [isDark, setIsDark] = useState(true);

  const navigate = useNavigate();

  const handleThemeToLight = (e) => {
    e.preventDefault();
    setIsDark(false);
  };
  const handleThemeToDark = (e) => {
    e.preventDefault();
    setIsDark(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login")
  }
  return (
    <div className="max-lg:collapse bg-primary shadow-sm w-full rounded-md sticky top-0 z-1">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label
        htmlFor="navbar-1-toggle"
        className="fixed inset-0 hidden max-lg:peer-checked:block"
      ></label>
      <div className="collapse-title navbar">
        <div className="navbar-start">
          <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
            <TfiAlignLeft className="size-6" />
          </label>
          <button className="btn btn-ghost text-xl">NoteStack</button>
        </div>
        <div className="navbar-center hidden lg:flex gap-5">
          <ul className="menu bg-base-300 lg:menu-horizontal rounded-box flex gap-12">
            <Link to={"/note"} className="flex gap-2">
              <RxDashboard className="size-6" />
              <span className="font-bold text-lg">Dashboard</span>
            </Link>
            <Link to={"/about"} className="flex gap-2">
              <FaCircleExclamation className="size-6" />
              <span className="font-bold text-lg">About</span>
            </Link>
            <Link to={"/contact"} className="flex gap-2">
              <MdContactMail className="size-6" />
              <span className="font-bold text-lg">Contact</span>
            </Link>
          </ul>
          <div>
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              {/* light mode */}
              <MdOutlineLightMode className="size-6 swap-on" />

              {/* Dark mode */}
              <MdOutlineDarkMode className="size-6 swap-off" />
            </label>
          </div>
        </div>
        {/* for small screen */}
        <div className="navbar-center lg:hidden">
          {isDark ? (
            <button
              className="btn btn-soft btn-circle"
              onClick={handleThemeToLight}
            >
              <MdOutlineLightMode className="size-6" />
            </button>
          ) : (
            <button className="btn btn-circle" onClick={handleThemeToDark}>
              <MdOutlineDarkMode className="size-6" />
            </button>
          )}
        </div>
        <div className="navbar-end gap-5">
          <div className="join">
            <div>
              <div>
                <input className="input join-item" placeholder="Search" />
              </div>
            </div>
            <div className="indicator">
              <button className="btn join-item">Search</button>
            </div>
          </div>
          <button className="hidden lg:flex btn" onClick={handleLogout}>
            <Link className="flex gap-1">
            <IoMdLogOut className="size-6 inline-block"/>
            Logout
            </Link>
          </button>
        </div>
      </div>

      {/* smaller screen view */}
      <div className="collapse-content lg:hidden z-1">
        <ul className="menu w-full">
          <Link
            to={"/note"}
            className="bg-base-200 w-full p-4 hover:bg-secondary"
          >
            Dashboard
          </Link>
          <Link
            to={"/about"}
            className="bg-base-200 w-full p-4 hover:bg-secondary"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="bg-base-200 w-full p-4 hover:bg-secondary"
          >
            Contact
          </Link>
          <Link
            to={"/login"}
            className="bg-red-700 w-full p-4 hover:bg-red-900"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </ul>
      </div>
    </div>
  );
};
