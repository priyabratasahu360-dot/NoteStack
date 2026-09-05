import { useQuery } from "@tanstack/react-query";
import { getAppStats } from "../api/api";
import { NotesPage } from "./NotesPage";
import { RecommendedNotesPage } from "./RecommendedNotesPage";
import {
  HiOutlineArrowDownTray,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
  HiOutlineChevronDown,
  HiOutlineSquares2X2
} from "react-icons/hi2";

export const DashboardPage = () => {
  const { data: stats } = useQuery({
    queryKey: ["appStats"],
    queryFn: getAppStats,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* heading */}
      <div className="w-full rounded-xl border border-base-content/10 bg-base-100 px-5 py-4 shadow-xs flex items-center gap-4">
        <HiOutlineSquares2X2 className="size-6" />
        <h1 className="text-xl font-bold tracking-tight text-base-content">
          Dashboard
        </h1>
      </div>


      {/* Overview Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <HiOutlineArrowDownTray className="size-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
              Total Downloads
            </span>
            <h3 className="text-2xl font-extrabold text-base-content">
              {stats?.totalDownloads?.toLocaleString() || "0"}
            </h3>
            <span className="text-[11px] text-emerald-500 font-medium">
              Community engagements
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <HiOutlineUsers className="size-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
              Active Learners
            </span>
            <h3 className="text-2xl font-extrabold text-base-content">
              {stats?.totalUsers?.toLocaleString() || "0"}
            </h3>
            <span className="text-[11px] text-indigo-500 font-medium">
              Registered users
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm flex items-center gap-4 sm:col-span-2 lg:col-span-1">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <HiOutlineDocumentText className="size-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
              Knowledge Repository
            </span>
            <h3 className="text-2xl font-extrabold text-base-content">
              Verified
            </h3>
            <span className="text-[11px] text-amber-500 font-medium">
              Peer-reviewed notes
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Notes Section */}
      <section className="space-y-4">
        <RecommendedNotesPage />
      </section>

      {/* All Available Notes Section */}
      <section className="space-y-4">
        <NotesPage />
      </section>

      {/* Modern FAQ / Help Guide Accordion */}
      <section className="pt-6 border-t border-base-content/10">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-200 text-xs font-semibold text-base-content/70 mb-2">
              <HiOutlineQuestionMarkCircle className="size-4 text-indigo-500" />
              <span>Help & Questions</span>
            </div>
            <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            <details className="group rounded-2xl bg-base-100 border border-base-content/10 p-4 transition-all">
              <summary className="flex items-center justify-between font-semibold cursor-pointer list-none text-base-content">
                <span>Why am I getting recommended notes?</span>
                <HiOutlineChevronDown className="size-5 transition-transform group-open:rotate-180 text-indigo-500" />
              </summary>
              <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
                Recommended notes are tailored specifically to your learning profile and subjects based on your chosen tags and interest preferences in your profile settings.
              </p>
            </details>

            <details className="group rounded-2xl bg-base-100 border border-base-content/10 p-4 transition-all">
              <summary className="flex items-center justify-between font-semibold cursor-pointer list-none text-base-content">
                <span>How do I download and save study notes?</span>
                <HiOutlineChevronDown className="size-5 transition-transform group-open:rotate-180 text-indigo-500" />
              </summary>
              <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
                Click on the download button on any note card. The file will download to your machine directly and be recorded in your "My Downloads" section for easy re-access anytime.
              </p>
            </details>
          </div>
        </div>
      </section>

    </div>
  );
};
