import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";

import { HomeLayout } from "./layout/HomeLayout";
import { DashBoardLayout } from "./layout/DashBoardLayout";
import { UploadedNotesPage } from "./pages/UploadedNotesPage";
import { CreateNotePage } from "./pages/CreateNotePage";
import { DownloadedNotesPage } from "./pages/DownloadedNotesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { getAuthUser } from "./api/api";
import { useQuery } from "@tanstack/react-query";

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
          element={authUser ? <HomeLayout /> : <Navigate to={"/login"} />}
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
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
