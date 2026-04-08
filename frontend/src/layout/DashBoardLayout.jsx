import { Sidebar } from "../components/Sidebar";
import { DashboardPage } from "../pages/DashboardPage";
export const DashBoardLayout = () => {
  return(
    <div>
      <Sidebar />
      <DashboardPage />
    </div>
  )
}