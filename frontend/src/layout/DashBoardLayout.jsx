import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { DashboardPage } from "../pages/DashboardPage";
import { Footer } from "../components/Footer";

export const DashBoardLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-base-200/40 text-base-content">
      <Navbar />
      <Sidebar heading="Dashboard" />
      <main className="flex-1 w-full">
        <DashboardPage />
      </main>
      <Footer />
    </div>
  );
};