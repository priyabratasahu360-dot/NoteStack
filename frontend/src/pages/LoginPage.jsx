//EXTERNAL LIBRARIES
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//API FUNCTIONS
import { loginMutation } from "../api/api";

//ASSETS (Icons)
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


export const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const queryClient = useQueryClient();

  const {mutate: mutateLoginMutation} = useMutation({
    mutationFn: loginMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutateLoginMutation(loginData);
  }

  const url = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth/google" : "/api/auth/google";

  const loginWithGoogle = () => {
    window.location.href = url;
  }
  return (
    <div className="flex justify-center items-center flex-col lg:p-4 p-2 gap-10">
      <div className="border p-4 rounded-lg border-base-300 bg-base-300 flex items-center justify-center">
        <img src="../src/assets/hero.png" className="size-30 " />
      </div>
      <div className="border border-base-300 bg-base-200 p-2 rounded-lg w-full lg:max-w-2xl">
        <div className="border-b-2 bg-primary mb-8 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-center">Welcome Back !</h3>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {/* email input */}
          <label className="input validator w-full">
            <input type="email"
             placeholder="yourmail@gmail.com" 
             required
             value={loginData.email}
             onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
          </label>
          {/* email error message */}
          <div className="validator-hint hidden">Enter valid email address</div>
          {/* password input */}
          <label className="input validator w-full">
            <input
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />
          </label>
          {/* password error message */}
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
          <button className="btn btn-primary text-lg mt-8" onClick={handleLogin}>Login</button>
        </div>

        <div className="flex gap-2 justify-center items-center mt-4">
          <p className="font-bold">Dont have an Account ?</p>
          <Link to={"/signup"} className="font-bold text-secondary">
            SIGNUP
          </Link>
        </div>
        {/* Optional login method to be implemented */}
        <div className="flex flex-col gap-2 mt-8 border-t border-primary">
          {/* GitHub */}
          <button className="btn bg-black text-white border-black">
            <FaGithub className="size-5" />
            Login with GitHub
          </button>
          {/* Google */}
          <button className="btn bg-white text-black border-[#e5e5e5]" onClick={loginWithGoogle}>
            <FcGoogle className="size-5" />
            Login with Google
          </button>
        </div>
      </div>

      {/* Guidance */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title font-semibold">
            How do I create an account?
          </div>
          <div className="collapse-content text-sm">
            Click the "Sign Up" button in the top form and follow the
            registration process.
          </div>
        </div>
        
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold">
            How do I update my profile information?
          </div>
          <div className="collapse-content text-sm">
            Go to Dashboard in the homepage and select "Profile" then "Edit profile" to make
            changes.
          </div>
        </div>
    </div>
  );
};
