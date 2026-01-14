"use client";
import Signup from "@/components/Authentication/Signup";
import Image from "next/image";
import { useContext, useState } from "react";
import p1 from "../../../public/svg/web_logo.svg";
import { signupuser } from "@/api/signup";
// import { AuthContext } from "../Provider/AuthProvider";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Provider/AuthProvider";
import toast from "react-hot-toast";

const SignUp = ({ otp, identifier }) => {
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
  const { setUserData } = useContext(AuthContext) || {};
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "certifications") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData?.name,
      email: formData?.email,
      phone: formData?.phone,
      password: formData?.password,
      street: formData?.address,
      role: "clinician",
      identifier: identifier,
      otp: otp.join(""),
      hcpcTitle: formData?.hcpcTitle,
      regNo: formData?.regNo,
      practiceName: formData?.practiceName,
      bankDetails: formData?.bankDetails,
      certification: "test",
    };

    const result = await signupuser(payload);
    if (result && result?.payload?.token?.access_token) {
      localStorage.setItem("accessToken", result.payload.token.access_token);
      const userData = result.payload.user;
      setUserData(userData);
      toast.success("Signup successful!");
      router.replace("/");
    }
    else {
      toast.error(result?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-[#114654] w-full py-7 block lg:hidden "></div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md lg:bg-white p-8 rounded-lg lg:shadow-md">
          <div className="flex items-start justify-start">
            <Image
              src={p1}
              alt="Logo"
              width={80}
              height={80}
              className="w-11 h-11"
            />
          </div>
          <h2 className="text-2xl font-semibold text-[#000000] text-start my-4">
            Sign Up
          </h2>
          <p className="text-start text-xs font-normal text-[#3C3C4399] mb-6">
            Join NeuroCheckPro to begin your journey toward clarity and expert
            guidance. It only takes a minute!
          </p>
          <Signup
            identifier={identifier}
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
