"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";
import { usePathname } from "next/navigation";
import AuthProvider from "@/Provider/AuthProvider";
import Private from "@/components/PrivateRoute/Private";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Pages that do not require layout
  const isAuthPage =
    pathname.startsWith("/signup") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/sendotp") ||
    pathname.startsWith("/verifyotp");

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          {isAuthPage ? (
            // Auth pages center layout
            <div className="flex items-center justify-center lg:bg-[#F6F7F9] min-h-screen">
              <Toaster />
              {children}
            </div>
          ) : (
            // Protected pages
            <Private>
              <div className="min-h-screen flex">
                <div className="w-[16%] fixed left-0 h-full">
                  <Navbar />
                </div>

                <div className="lg:flex-1 lg:ml-[16%] bg-[#F6F7F9] lg:p-8 min-h-screen w-full lg:w-0">
                    <Topbar />
                     <Toaster />
                  {children}
                </div>
              </div>
            </Private>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
