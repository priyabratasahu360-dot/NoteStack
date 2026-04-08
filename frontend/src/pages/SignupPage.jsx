import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Link } from "react-router-dom";

export const SignupPage = () => {
  return (
    <div className="flex justify-center items-center flex-col lg:p-4 p-8 gap-10">
      <div className="border p-4 rounded-lg border-base-300 bg-base-300 flex items-center justify-center">
        <img src="../src/assets/hero.png" className="size-30 " />
      </div>
      <div className="border border-base-300 bg-base-200 p-2 rounded-lg w-full lg:max-w-2xl">
        <div className="border-b-2 bg-primary mb-8 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-center">Create Account</h3>
        </div>
        <div className="flex flex-col gap-2 w-full">
            <label className="input validator w-full">
          <input
            type="text"
            required
            placeholder="Username"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="4"
            maxLength="10"
            title="Only letters, numbers or dash"
            />
          <p className="validator-hint">
            Must be 4 to 10 characters
            <br />
            containing only letters, numbers or dash
          </p>
            </label>
          {/* email input */}
          <label className="input validator w-full">
            <input type="email" placeholder="yourmail@gmail.com" required />
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
          <button className="btn btn-primary text-lg mt-8">Create Account</button>
        </div>
        <div className="flex gap-2 justify-center items-center mt-4">
          <p className="font-bold">Already have an Account ?</p>
          <Link to={"/login"} className="font-bold text-secondary">
            LOGIN
          </Link>
        </div>
        <div className="flex flex-col gap-2 mt-8 border-t border-primary">
          {/* GitHub */}
          <button className="btn bg-black text-white border-black">
            <FaGithub className="size-5" />
            Signup with GitHub
          </button>
          {/* Google */}
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <FcGoogle className="size-5" />
            Signup with Google
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
          Click the "Sign Up" button in the top form and follow the registration
          process.
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          How do I update my profile information?
        </div>
        <div className="collapse-content text-sm">
          Go to Dashboard in the homepage and select "Profile" then "Edit
          profile" to make changes.
        </div>
      </div>
    </div>
  );
};
