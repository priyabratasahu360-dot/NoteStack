import { Link } from "react-router-dom";
import { 
  HiOutlineBookOpen, 
  HiOutlineHeart, 
  HiOutlineCodeBracket,
  HiOutlineShieldCheck
} from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-base-100 border-t border-base-content/10 text-base-content/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm">
                <HiOutlineBookOpen className="size-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
                NoteStack
              </span>
            </Link>
            <p className="text-sm text-base-content/60 max-w-sm leading-relaxed">
              A modern, community-driven study note sharing platform. Capture, organize, and exchange high-yield study resources with learners globally.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-base-content/90 mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>
                <Link to="/" className="hover:text-indigo-600 transition">
                  Browse Notes
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-600 transition">
                  About NoteStack
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-600 transition">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-indigo-600 transition">
                  Upload Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech & Community */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-base-content/90 mb-3">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/priyabratasahu360-dot/NoteStack"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-base-200 border border-base-content/10 flex items-center justify-center text-base-content/70 hover:text-indigo-600 hover:bg-base-300 transition"
                aria-label="GitHub Repository"
              >
                <FaGithub className="size-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-base-200 border border-base-content/10 flex items-center justify-center text-base-content/70 hover:text-indigo-600 hover:bg-base-300 transition"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="size-5" />
              </a>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-base-content/50">
              <HiOutlineCodeBracket className="size-4" />
              <span>Built with MERN + Tailwind v4</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-base-content/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-base-content/50">
          <p>© {new Date().getFullYear()} NoteStack. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for learners everywhere</span>
            <HiOutlineHeart className="size-3.5 text-rose-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};
