import { TfiAlignLeft } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

import { RxDashboard } from "react-icons/rx";
import { FaCircleExclamation } from "react-icons/fa6";
import { MdContactMail } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

import { logout } from "../api/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useThemeSelector } from "../hooks/useThemeSelector";

export const Navbar = () => {

  const [searchInput, setSearchInput] = useState("");

  const {isDark, toggleTheme} = useThemeSelector();


  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async(e) => {
    e.preventDefault();
    await logout();
    queryClient.setQueryData(["authUser"], null);
    queryClient.invalidateQueries({queryKey: ["authUser"]});
    navigate("/login");
  }

  const handleSearch = async() => {
    navigate(`/?query=${searchInput}`)
  }

  const navbarLinkItem = [
    {to: "/note", text: "Dashboard"},
    {to: "/about", text: "About"},
    {to: "/contact", text: "Contact"},
    {to: "/profile", text: "Profile"},
  ]
  const navbarLinkItemWithIcon = [
    {to: "/note", text: "Dashboard", icon: <RxDashboard className="size-6"/>},
    {to: "/about", text: "About", icon: <FaCircleExclamation className="size-6"/>},
    {to: "/contact", text: "Contact", icon: <MdContactMail className="size-6"/>},
    {to: "/profile", text: "Profile", icon: <FaUserCircle className="size-6"/>},
  ]

  return (
    <div className={`max-lg:collapse shadow-sm w-full rounded-md sticky top-0 z-1 bg-base-100 text-base-content`}>
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
        {/* navbar with icon for larger screen view */}
        <div className="navbar-center hidden lg:flex gap-5">
          <ul className={`menu lg:menu-horizontal rounded-box flex gap-12`}>
            {navbarLinkItemWithIcon.map((item, index) => (
              <Link to={item.to} key={index} className="flex gap-2">
                <span className="font-semibold text-lg">{item.text}</span>
              </Link>
            ))}
          </ul>
          <div className={`navbar-center mx-5`}>
            <button
              className="btn btn-soft btn-circle"
              onClick={toggleTheme}
            >
               {isDark ? 
              <MdOutlineLightMode className="size-6" />:
              <MdOutlineDarkMode className="size-6"/>
            }
            </button>
        </div>
        </div>
        {/* for small screen theme change icon*/}
        <div className={`navbar-center lg:hidden mx-5`}>
            <button
              className="btn btn-soft btn-circle"
              onClick={toggleTheme}
            >
              {isDark ? 
              <MdOutlineLightMode className="size-6" />:
              <MdOutlineDarkMode className="size-6"/>
            }
            </button>
        </div>
        <div className="navbar-end gap-5">
          <div className="join">
            <div>
              <div>
                <input 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={`input bg-base-100 text-base-content join-item`} placeholder="Search" />
              </div>
            </div>
            <div className="indicator">
              <button 
              onClick={handleSearch}
              className="btn join-item">Search</button>
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

      {/* smaller screen view navbar item*/}
      <div className={`collapse-content lg:hidden z-1`}>
        <ul className="menu w-full">
          {navbarLinkItem.map((item, index) => (
            <Link to={item.to} key={index} className="bg-base-200 w-full p-4 hover:bg-base-100 text-base-content">
              {item.text}
            </Link>
          ))}
          <Link
            to={"/login"}
             className={`bg-base-200 w-full p-4 hover:bg-red-900 hover:text-white`}
            onClick={handleLogout}
          >
            Logout
          </Link>
        </ul>
      </div>
    </div>
  );
};
