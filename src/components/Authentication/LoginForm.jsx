"use client";
import { loginuser } from "@/api/signup";
import { AuthContext } from "../../Provider/AuthProvider";
// import { AuthContext } from "../Provider/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { CiUser } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import toast from "react-hot-toast";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(AuthContext);
  const setUserData = context?.setUserData ?? (() => {});
  const setLoading = context?.setLoading ?? (() => {});
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      identifier: formData?.email,
      password: formData?.password,
    };

    // //console.log("Logging in with:", payload);
    setLoading(true);
    const result = await loginuser(payload);

    if (result && result?.payload?.token?.access_token) {
      localStorage.setItem("accessToken", result?.payload?.token?.access_token);
      const userData = result.payload.filteredUser;
      setUserData(userData);
      localStorage.setItem("userData", JSON.stringify(userData));
      setLoading(false);
      toast.success("Login successful");
      router.replace("/");
    }
    else {
      toast.error(result?.message || "Login failed");
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email / Phone */}
      <div className="relative">
        <input
          type="email"
          name="email"
          placeholder="Your E-mail or Phone"
          value={formData?.email}
          onChange={handleChange}
          className="w-full px-12 py-3 border placeholder:text-xs placeholder:text-[#00000080] border-[#E2E2E2] rounded-full focus:outline-none"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <CiUser />
        </span>
      </div>

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-12 py-3 border placeholder:text-xs placeholder:text-[#00000080] border-[#E2E2E2] rounded-full focus:outline-none"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <RiLockPasswordLine />
        </span>
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
          tabIndex={-1}
        >
          <PiEyeLight />
        </button>
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end">
        <a href="#" className="text-xs text-[#114654] hover:underline">
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        className="w-full bg-[#0A4863] cursor-pointer text-white py-3 rounded-full font-semibold "
      >
        Sign In
      </button>
      <div className="flex justify-center items-center mt-2">
        <Link className="text-xs font-normal text-center" href="/signup">
          <span className=" text-[#3C3C4399] ">Don’t have account?</span>
          <span className="text-[#114654]">Sign Up</span>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
