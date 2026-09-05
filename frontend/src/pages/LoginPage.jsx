import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginMutation } from "../api/api";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { 
  HiOutlineBookOpen, 
  HiOutlineEnvelope, 
  HiOutlineLockClosed, 
  HiOutlineArrowRight,
  HiOutlineChevronDown
} from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate: mutateLoginMutation, isPending } = useMutation({
    mutationFn: loginMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutateLoginMutation(loginData);
  };

  const url =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/auth/google"
      : "/api/auth/google";

  const loginWithGoogle = () => {
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-base-200/50 flex flex-col justify-center items-center px-4 py-12">
      
      {/* Container */}
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <HiOutlineBookOpen className="size-6" />
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-base-content/60">
            Log in to continue managing and sharing your study notes
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-base-100 rounded-3xl border border-base-content/10 shadow-sm p-6 sm:p-8 space-y-6">
          
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="student@university.edu"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-200/70 border border-base-content/10 text-sm focus:bg-base-100 focus:border-indigo-500 focus:outline-none transition"
                />
                <HiOutlineEnvelope className="absolute left-3.5 top-3 size-4 text-base-content/40" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-200/70 border border-base-content/10 text-sm focus:bg-base-100 focus:border-indigo-500 focus:outline-none transition"
                />
                <HiOutlineLockClosed className="absolute left-3.5 top-3 size-4 text-base-content/40" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/25 transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <AiOutlineLoading3Quarters className="size-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In to NoteStack</span>
                  <HiOutlineArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-base-content/10 w-full" />
            <span className="bg-base-100 px-3 text-xs font-semibold text-base-content/40 uppercase tracking-wider">
              Or continue with
            </span>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={loginWithGoogle}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-base-content/10 bg-base-100 hover:bg-base-200 text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <FcGoogle className="size-4" />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-base-content/10 bg-base-100 hover:bg-base-200 text-xs font-bold transition shadow-xs opacity-75 cursor-not-allowed"
              title="GitHub OAuth coming soon"
            >
              <FaGithub className="size-4" />
              <span>GitHub</span>
            </button>
          </div>

          {/* Switch to Signup */}
          <div className="text-center pt-2">
            <p className="text-xs text-base-content/60">
              Don't have an account yet?{" "}
              <Link to="/signup" className="font-bold text-indigo-600 hover:underline">
                Create one free
              </Link>
            </p>
          </div>

        </div>

        {/* Quick FAQ accordion */}
        <div className="space-y-2">
          <details className="group rounded-2xl bg-base-100 border border-base-content/10 p-3.5 text-xs transition">
            <summary className="flex items-center justify-between font-semibold cursor-pointer list-none">
              <span>Trouble signing in?</span>
              <HiOutlineChevronDown className="size-4 transition-transform group-open:rotate-180 text-indigo-500" />
            </summary>
            <p className="mt-2 text-base-content/70 leading-relaxed">
              Make sure your email address is spelled correctly, or try logging in with Google OAuth if your account was created using Google.
            </p>
          </details>
        </div>

      </div>

    </div>
  );
};
