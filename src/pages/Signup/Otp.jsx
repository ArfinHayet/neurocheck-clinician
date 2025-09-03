"use client";
import React, { useState, useRef } from "react";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";
import SignUp from "./SignUp";

const Otp = () => {
  const [identifier, setIdentifier] = useState(""); 
  const [otp, setOtp] = useState(new Array(4).fill("")); 
  const [step, setStep] = useState(1);
  const inputsRef = useRef([]);

  return (
    <div>
      {step === 1 && (
        <SendOtp
          identifier={identifier}
          setIdentifier={setIdentifier}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        <VerifyOtp
          otp={otp}
          setOtp={setOtp}
          inputsRef={inputsRef}
          setStep={setStep}
          identifier={identifier} 
        />
      )}

      {step === 3 && (     
        <SignUp          
          otp={otp}
          setOtp={setOtp}
          inputsRef={inputsRef}
          setStep={setStep}
          identifier={identifier}
        />
      )}
    </div>
  );
};

export default Otp;
