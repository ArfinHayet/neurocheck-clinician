"use client";

import p1 from "../../../public/svg/web_logo.svg";
import Image from "next/image";
import Input from "@/components/ui-reusable/Input";
import { sendOtp } from "@/api/signup";

const SendOtp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const identifier = form.phone.value;

     const payload = { identifier }; 
      const result = await sendOtp(payload);
      console.log("OTP sent:", result);
      
   
  };

  return (
    <div>
      <div className="bg-[#114654] w-full py-7 block lg:hidden"></div>
      <div className="min-h-screen flex items-center justify-center">
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

          <h2 className="text-xl font-semibold text-[#000000] text-start my-4">
            Enter Your Phone Number
          </h2>
          <p className="text-start text-xs font-normal text-[#3C3C4399] mb-6">
            Join NeuroCheckPro to begin your journey toward clarity and expert
            guidance. It only takes a minute!
          </p>

          {/* Wrap input and button inside a form */}
          <form onSubmit={handleSubmit}>
            <Input
              name="phone"
              placeholder="Enter Phone Number"
              className="w-full px-4 py-1 placeholder:text-xs border bg-[#FFFFFF] lg:bg-none border-[#E2E2E2] rounded-3xl outline-none"
            />

            <button
              type="submit"
              className="w-full bg-[#0A4863] cursor-pointer text-white py-2 mt-2.5 rounded-2xl font-normal"
            >
              Sign up With Phone Number
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;
