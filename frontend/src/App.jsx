import {Routes, Route} from "react-router-dom";

import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";

import { HomeLayout } from "./layout/HomeLayout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
