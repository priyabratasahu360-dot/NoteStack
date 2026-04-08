import {Routes, Route} from "react-router-dom";

import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";

import { HomeLayout } from "./layout/HomeLayout";
import { DashBoardLayout } from "./layout/DashBoardLayout";
import { UploadedNotesPage } from "./pages/UploadedNotesPage";
import { CreateNotePage } from "./pages/CreateNotePage";
import { DownloadedNotesPage } from "./pages/DownloadedNotesPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/note" element={<DashBoardLayout />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/uploaded" element={<UploadedNotesPage />} />
      <Route path="/upload" element={<CreateNotePage />} />
      <Route path="/downloads" element={<DownloadedNotesPage />} />
    </Routes>
  )
}

export default App
