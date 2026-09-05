import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { 
  HiOutlineSparkles, 
  HiOutlineAcademicCap, 
  HiOutlineShieldCheck, 
  HiOutlineDocumentDuplicate,
  HiOutlineUserGroup
} from "react-icons/hi2";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss } from "react-icons/si";

export const AboutPage = () => {
  const features = [
    {
      title: "MERN Stack Architecture",
      desc: "Powered by MongoDB, Express, React 19, and Node.js for lightning-fast responsiveness and scalability.",
      icon: <HiOutlineSparkles className="size-6 text-indigo-500" />
    },
    {
      title: "Encrypted & Secure",
      desc: "Robust JWT session protection and encrypted credential storage to keep your academic data safe.",
      icon: <HiOutlineShieldCheck className="size-6 text-purple-500" />
    },
    {
      title: "Rich Media & Fast Previews",
      desc: "Cloud-optimized file storage with Cloudinary for fast PDF downloads and visual note previews.",
      icon: <HiOutlineDocumentDuplicate className="size-6 text-amber-500" />
    },
    {
      title: "Community Driven",
      desc: "Built by students, for students. Share high-yield notes, receive ratings, and build your study reputation.",
      icon: <HiOutlineUserGroup className="size-6 text-emerald-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-base-200/40 text-base-content flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <HiOutlineAcademicCap className="size-4" />
            <span>Our Mission & Vision</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Empowering Collaborative Learning Through{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
              NoteStack
            </span>
          </h1>

          <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
            NoteStack was built to eliminate the chaos of scattered study notes, broken links, and lost course handouts. We provide a centralized, clean, and modern platform where learners worldwide can freely exchange curated notes.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-base-100 border border-base-content/10 shadow-xs space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-base-content">
                {feat.title}
              </h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack Showcase */}
        <div className="p-8 rounded-3xl bg-base-100 border border-base-content/10 shadow-xs text-center space-y-6">
          <div>
            <h3 className="text-xl font-extrabold">Modern Tech Stack</h3>
            <p className="text-xs text-base-content/60 mt-1">
              Engineered with modern tools for optimal performance
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-base-content/70">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <FaReact className="size-6 text-cyan-400" />
              <span>React 19</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-sm">
              <SiTailwindcss className="size-6 text-sky-400" />
              <span>Tailwind v4</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-sm">
              <FaNodeJs className="size-6 text-emerald-500" />
              <span>Node.js</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-sm">
              <SiExpress className="size-6 text-base-content" />
              <span>Express.js</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-sm">
              <SiMongodb className="size-6 text-emerald-600" />
              <span>MongoDB</span>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};
