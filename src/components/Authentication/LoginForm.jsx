import React, { useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { PiEyeLight } from 'react-icons/pi';
import { RiLockPasswordLine } from "react-icons/ri";
const LoginForm = () => {
      const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
   
  };
    return (
         <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email / Phone */}
          <div className="relative">
            <input
              type="text"
              name="email"
              placeholder="Your E-mail or Phone"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-12 py-3 border placeholder:text-xs placeholder:text-[#00000080] border-[#E2E2E2] rounded-full focus:outline-none"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <CiUser/>
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
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
            className="w-full bg-[#0A4863] text-white py-3 rounded-full font-semibold "
          >
            Sign In
          </button>
        </form>
    );
};

export default LoginForm;

