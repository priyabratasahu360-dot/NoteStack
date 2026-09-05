import { Link, useLocation } from "react-router-dom";
import { 
  HiOutlineSquares2X2,
  HiOutlineCloudArrowUp,
  HiOutlineArrowDownTray,
  HiOutlineDocumentDuplicate,
  HiOutlineUserCircle
} from "react-icons/hi2";

export const Sidebar = ({ heading = "Dashboard" }) => {
  const location = useLocation();

  const navItems = [
    { to: "/note", text: "Overview", icon: <HiOutlineSquares2X2 className="size-4" /> },
    { to: "/uploaded", text: "Uploads", icon: <HiOutlineCloudArrowUp className="size-4" /> },
    { to: "/upload", text: "Create", icon: <HiOutlineDocumentDuplicate className="size-4" /> },
    { to: "/downloads", text: "Downloads", icon: <HiOutlineArrowDownTray className="size-4" /> },
    { to: "/profile", text: "Profile", icon: <HiOutlineUserCircle className="size-4" /> },
  ];

  return (
    <div className="hidden sm:block w-full bg-base-100/90 backdrop-blur-md border-b border-base-content/10 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5 gap-4">
          
          {/* Section Heading */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs sm:text-sm font-extrabold text-base-content uppercase tracking-wider">
              {heading}
            </span>
          </div>

          {/* Desktop Workspace Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item, idx) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={idx}
                  to={item.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-primary-content shadow-xs"
                      : "bg-base-200/70 text-base-content/75 hover:text-base-content hover:bg-base-200"
                  }`}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};
