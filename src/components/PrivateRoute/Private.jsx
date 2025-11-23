"use client";

import { AuthContext } from "@/Provider/AuthProvider";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { isAuthenticated } from "../utils/token";

const Private = ({ children }) => {
  const { userData,loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // setIsClient(true);

      if (!loading && !isAuthenticated()) {
        // alert("You are not authenticated, Please login first")
    //   toast.error("You are not authenticated, Please login first");
      redirect("/signin");
     
    }
  }, [loading, userData, router]);

  return (userData) ? children : null;
};

export default Private;
