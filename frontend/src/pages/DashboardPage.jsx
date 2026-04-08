import { NotesPage } from "./NotesPage";
import { RecommendedNotesPage } from "./RecommendedNotesPage";
export const DashboardPage = () => {
  return (
    <div>
      <RecommendedNotesPage />
      <div className="border-y border-y-primary my-10">
        <div className="collapse collapse-plus bg-secondary border border-base-300">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title font-semibold">
            Why I am getting recommended notes?
          </div>
          <div className="collapse-content text-sm">
            Recommended notes are not random suggestion we suggest you the best notes based on your profile.
          </div>
        </div>
        <div className="collapse collapse-plus bg-secondary border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold">
            How to Download Notes?
          </div>
          <div className="collapse-content text-sm">
            To download a note you can just simply click on the small download icon on the right side of the each note item then you can check in your downloads section.
          </div>
        </div>
      </div>
      <NotesPage />
    </div>
  );
};
