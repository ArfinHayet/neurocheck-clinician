"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";
import { usePathname } from "next/navigation";
import AuthProvider from "@/Provider/AuthProvider";
// import AuthProvider from "@/Provider/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({ children }) {
  const pathname = usePathname();
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
            <div className="flex items-center justify-center lg:bg-[#F6F7F9] min-h-screen">{children}</div>
          ) : (
            <div className="min-h-screen flex">
              <div className="w-[16%] fixed left-0 h-full">
                <Navbar />
              </div>
              <div className="lg:flex-1 lg:ml-[16%] bg-[#F6F7F9] lg:p-8 min-h-screen w-full lg:w-0">
                <Topbar />
                {children}
              </div>
            </div>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
