"use client";

import Image from "next/image";
import p1 from "../../../public/svg/web_logo.svg";
import { sendOtp } from "@/api/signup";
import Link from "next/link";

const SendOtp = ({ identifier, setIdentifier, setStep }) => {

  const handleSubmitOtp = async () => {

    const payload = {
      identifier: identifier
    };

    const result = await sendOtp(payload);
    
    if (result) {
      alert(result?.message);
      setStep(2);
    } else {
      alert(result?.message);
    }
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
            Enter Your Email or Phone to Get Started
          </h2>
          <p className="text-start text-xs font-normal text-[#3C3C4399] mb-6">
            Join NeuroCheckPro to begin your journey toward clarity and expert
            guidance. It only takes a minute!
          </p>

          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter Email or Phone Number"
            className="w-full px-4 py-2 placeholder:text-xs border bg-[#FFFFFF] border-[#E2E2E2] rounded-3xl outline-none"
          />

          <button
            onClick={handleSubmitOtp}
            className="w-full bg-[#0A4863] cursor-pointer text-white py-2 mt-3 rounded-2xl font-normal"
          >
            Send OTP
          </button>
          <div className="flex justify-center items-center mt-2">
              <Link className="text-xs font-normal text-center" href="/signin">
            <span className=" text-[#3C3C4399] ">Do you have account?</span>
            <span className="text-[#114654]">Sign In</span>
          </Link>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default SendOtp;
