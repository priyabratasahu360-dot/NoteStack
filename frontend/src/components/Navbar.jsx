import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { logout, getAuthUser } from "../api/api";
import { useThemeSelector } from "../hooks/useThemeSelector";

// Icons
import { 
  HiOutlineSparkles, 
  HiOutlineBookOpen, 
  HiOutlineArrowRightOnRectangle,
  HiOutlineSwatch,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineUserCircle,
  HiOutlineInformationCircle,
  HiOutlineEnvelope,
  HiOutlineSquares2X2,
  HiOutlineCloudArrowUp,
  HiOutlineArrowDownTray,
  HiOutlineCheck
} from "react-icons/hi2";

export const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const { theme, setTheme, themes } = useThemeSelector();

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });

  const handleLogout = async (e) => {
    e?.preventDefault();
    await logout();
    queryClient.setQueryData(["authUser"], null);
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
    setMobileDrawerOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { to: "/", text: "Explore", icon: <HiOutlineSparkles className="size-5" /> },
    { to: "/note", text: "Dashboard", icon: <HiOutlineSquares2X2 className="size-5" />, authOnly: true },
    { to: "/upload", text: "Upload", icon: <HiOutlineCloudArrowUp className="size-5" />, authOnly: true },
    { to: "/uploaded", text: "My Uploads", icon: <HiOutlineCloudArrowUp className="size-5" />, authOnly: true },
    { to: "/downloads", text: "Downloads", icon: <HiOutlineArrowDownTray className="size-5" />, authOnly: true },
    { to: "/about", text: "About", icon: <HiOutlineInformationCircle className="size-5" /> },
    { to: "/contact", text: "Contact", icon: <HiOutlineEnvelope className="size-5" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-6 shrink-0">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-primary-content shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                  <HiOutlineBookOpen className="size-5.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    NoteStack
                  </span>
                  <span className="text-[10px] font-medium tracking-wider uppercase opacity-50 -mt-1">
                    Study Hub
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((item, idx) => {
                  if (item.authOnly && !authUser) return null;
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={idx}
                      to={item.to}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/15 text-primary font-semibold"
                          : "text-base-content/80 hover:text-primary hover:bg-base-300/50"
                      }`}
                    >
                      {item.icon}
                      <span>{item.text}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Action Icons & Auth */}
            <div className="flex items-center gap-2.5 shrink-0">
              
              {/* Theme Selector Modal Trigger */}
              <button
                onClick={() => setThemeModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-base-content/10 hover:bg-base-200 text-base-content/80 hover:text-base-content transition cursor-pointer"
                title="Change Color Theme"
              >
                <HiOutlineSwatch className="size-4.5 text-primary" />
                <span className="hidden sm:inline text-xs font-semibold capitalize">
                  {themes?.find(t => t.id === theme)?.label.split(" ")[0] || "Theme"}
                </span>
              </button>

              {/* Desktop Auth Section */}
              {authUser ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-base-content/10 hover:bg-base-200 transition"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/30">
                      {authUser.profilePhoto ? (
                        <img
                          src={authUser.profilePhoto}
                          alt={authUser.userName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        authUser.userName?.[0]?.toUpperCase() || "U"
                      )}
                    </div>
                    <span className="text-xs font-semibold text-base-content/90 max-w-[100px] truncate">
                      {authUser.userName}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl text-red-500 hover:bg-red-500/10 transition border border-red-500/20 cursor-pointer"
                  >
                    <HiOutlineArrowRightOnRectangle className="size-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-1.5 rounded-xl text-sm font-semibold text-base-content/80 hover:text-base-content transition"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-1.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-primary-content shadow-sm shadow-primary/30 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Drawer Hamburger Trigger */}
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-base-content/10 hover:bg-base-200 text-base-content cursor-pointer"
                aria-label="Open Navigation Drawer"
              >
                <HiOutlineBars3 className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Slide-In Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-overlay"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Sliding Sheet Panel */}
          <div className="relative ml-auto w-4/5 max-w-sm h-full bg-base-100 border-l border-base-content/15 p-5 shadow-2xl flex flex-col justify-between z-10 animate-drawer overflow-y-auto">
            
            <div className="space-y-6">
              
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-base-content/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold">
                    <HiOutlineBookOpen className="size-5" />
                  </div>
                  <span className="font-extrabold text-base bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    NoteStack
                  </span>
                </div>

                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-base-200 text-base-content/70 hover:text-base-content cursor-pointer"
                >
                  <HiOutlineXMark className="size-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-base-content/50 px-2">
                  Menu
                </span>
                {navLinks.map((item, idx) => {
                  if (item.authOnly && !authUser) return null;
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={idx}
                      to={item.to}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                        isActive
                          ? "bg-primary text-primary-content shadow-xs"
                          : "text-base-content/80 hover:bg-base-200"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Theme Picker Quick Bar inside Drawer */}
              <div className="pt-2 border-t border-base-content/10 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-base-content/50 px-2">
                  Theme Palette
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {themes?.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        theme === t.id
                          ? "bg-primary text-primary-content border-primary"
                          : "bg-base-200 border-base-content/10 text-base-content/80"
                      }`}
                    >
                      <span>{t.icon}</span>
                      <span className="truncate">{t.label.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Bottom Auth Section */}
            <div className="pt-6 border-t border-base-content/10 space-y-2">
              {authUser ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-base-200 hover:bg-base-300 transition"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                      {authUser.profilePhoto ? (
                        <img
                          src={authUser.profilePhoto}
                          alt={authUser.userName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        authUser.userName?.[0]?.toUpperCase() || "U"
                      )}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-bold text-base-content truncate">
                        {authUser.userName}
                      </span>
                      <span className="text-[11px] text-base-content/50 truncate">
                        {authUser.email}
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 transition cursor-pointer"
                  >
                    <HiOutlineArrowRightOnRectangle className="size-4" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="text-center py-2.5 rounded-xl text-xs font-bold border border-base-content/15 bg-base-100 hover:bg-base-200 text-base-content"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="text-center py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-content shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Centered Theme Selector Dialog / Modal */}
      {themeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-overlay"
            onClick={() => setThemeModalOpen(false)}
          />

          <div className="relative w-full max-w-sm rounded-3xl bg-base-100 border border-base-content/15 shadow-2xl p-6 z-10 space-y-5 animate-modal">
            <div className="flex items-center justify-between border-b border-base-content/10 pb-3">
              <div className="flex items-center gap-2">
                <HiOutlineSwatch className="size-5 text-primary" />
                <h3 className="font-extrabold text-base text-base-content">
                  Choose Color Theme
                </h3>
              </div>
              <button
                onClick={() => setThemeModalOpen(false)}
                className="p-1 rounded-xl hover:bg-base-200 text-base-content/70 cursor-pointer"
              >
                <HiOutlineXMark className="size-5" />
              </button>
            </div>

            <div className="space-y-2">
              {themes?.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setThemeModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold border transition cursor-pointer ${
                    theme === t.id
                      ? "bg-primary text-primary-content border-primary shadow-sm"
                      : "bg-base-200/70 hover:bg-base-200 border-base-content/10 text-base-content/80"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{t.icon}</span>
                    <span>{t.label}</span>
                  </span>
                  {theme === t.id && <HiOutlineCheck className="size-5" />}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-center text-base-content/50">
              Theme automatically persists to your browser preferences.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
