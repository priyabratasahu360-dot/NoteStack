import { useQuery } from "@tanstack/react-query";
import { getAppStats } from "../api/api";

//PAGE COMPONENTS
import { NotesPage } from "./NotesPage";
import { RecommendedNotesPage } from "./RecommendedNotesPage";

export const DashboardPage = () => {

  const { data: stats } = useQuery({
    queryKey: ["appStats"],
    queryFn: getAppStats,
  });

  // console.log(stats);
  return (
    <div>
      <div className="shadow flex flex-col lg:flex-row">
        <div className="stat place-items-center">
          <div className="stat-title">Downloads</div>
          <div className="stat-value">{stats?.totalDownloads}</div>
          <div className="stat-desc">From January 1st to February 1st</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Users</div>
          <div className="stat-value text-secondary">{stats?.totalUsers}</div>
          <div className="stat-desc text-secondary">↗︎ {stats?.totalUsers} (100%)</div>
        </div>
      </div>
      <RecommendedNotesPage />
      <NotesPage />
      <div className="my-20 m-4">
        <div className="collapse collapse-plus bg-primary/50 border border-base-300">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title font-semibold">
            Why I am getting recommended notes?
          </div>
          <div className="collapse-content text-sm">
            Recommended notes are not random suggestion we suggest you the best
            notes based on your profile.
          </div>
        </div>
        <div className="collapse collapse-plus bg-primary/50 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold">
            How to Download Notes?
          </div>
          <div className="collapse-content text-sm">
            To download a note you can just simply click on the small download
            icon on the right side of the each note item then you can check in
            your downloads section.
          </div>
        </div>
      </div>
    </div>
  );
};
