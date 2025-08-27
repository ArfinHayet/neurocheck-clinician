"use client";
import Signup from "@/components/Authentication/Signup";
import Image from "next/image";
import { useState } from "react";
import p1 from "../../public/svg/web_logo.svg";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hcpcTitle: "",
    regNo: "",
    practiceName: "",
    address: "",
    bankDetails: "",
    certifications: null,
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "certifications") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="bg-[#114654] w-full py-7 block lg:hidden"></div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md lg:bg-white p-8 rounded-lg lg:shadow-md">
          <div className="flex items-start justify-start">
            <Image src={p1} width={80} height={80} className="w-11 h-11" />
          </div>
          <h2 className="text-2xl font-semibold text-[#000000] text-start my-4">
            Sign Up
          </h2>
          <p className="text-start text-xs font-normal text-[#3C3C4399] mb-6">
            Join NeuroCheckPro to begin your journey toward clarity and expert
            guidance. It only takes a minute!
          </p>
          <Signup
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
