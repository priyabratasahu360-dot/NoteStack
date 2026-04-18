//LIBRARIES & EXTERNAL TOOLS
import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

//API FUNCTIONS
import { getAuthUser } from "./api/api";

//LAYOUTS(Wrapper for pages)
import { HomeLayout } from "./layout/HomeLayout";
import { DashBoardLayout } from "./layout/DashBoardLayout";

//PAGE COMPONENTS
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { UploadedNotesPage } from "./pages/UploadedNotesPage";
import { CreateNotePage } from "./pages/CreateNotePage";
import { DownloadedNotesPage } from "./pages/DownloadedNotesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

function App() {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<HomeLayout />}
        />

        <Route path="/note" element={authUser ? <DashBoardLayout /> : (<Navigate to={"/login"}/>)} />

        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/uploaded"
          element={
            authUser ? <UploadedNotesPage /> : <Navigate to={"/login"} />
          }
        />

        <Route
          path="/upload"
          element={authUser ? <CreateNotePage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/downloads"
          element={
            authUser ? <DownloadedNotesPage /> : <Navigate to={"/login"} />
          }
        />

        <Route
          path="/contact"
          element={
            authUser ? <ContactPage /> : <Navigate to={"/login"} />
          }
        />

        <Route
          path="/about"
          element={
            <AboutPage />
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
