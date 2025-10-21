"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import p1 from "../../../public/svg/Ellipse 439.svg";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { PiClipboardTextThin } from "react-icons/pi";
import { BsClipboard2Data } from "react-icons/bs";
import Image from "next/image";
import { AuthContext } from "@/Provider/AuthProvider";
import { useContext } from "react";
const navItems = [
  {
    label: "Dashboard",
    icon: LuLayoutDashboard,
    href: "/",
  },
  {
    label: "Appointments",
    icon: PiClipboardTextThin,
    href: "/appointments",
  },
  {
    label: "Assessments",
    icon: BsClipboard2Data,
    href: "/assessments",
  },
  {
    label: "User",
    icon: CiUser,
    href: "/user",
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  
  const { userData } = useContext(AuthContext);
  console.log(userData)
  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

    const today = new Date();
    const optionsDay = { weekday: "long" };
    const optionsDate = { day: "2-digit", month: "short" };
    const day = today.toLocaleDateString("en-US", optionsDay);
    const date = today.toLocaleDateString("en-US", optionsDate);
    const year = today.getFullYear();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-white shadow md:min-h-screen pt-6">
        <div className="flex flex-col items-center text-center">
          <Image
            src={p1}
            alt="Dr. Eleanor Hughes"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-lg font-semibold">{userData?.name}</h2>
          <p className="text-sm text-gray-500">
          {userData?.hcpcTitle}
          </p>
        </div>
        <div className="px-5 mt-6">
          <div className="w-full border-y-[1px] border-[#E9E9E9] flex flex-col justify-start items-start gap-1 my-3 py-5">
            <p className=" text-xs text-[#6C6C6C]">{day}</p>
            <p className=" text-3xl font-medium text-[#3B3B3B]">{date}</p>
            <p className=" text-xs text-[#6C6C6C]">{year}</p>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center border-l-4 text-base font-medium pl-4 py-2 ${
                  active
                    ? "text-[#114654] border-[#114654] bg-[#1146540d]"
                    : "text-[#959595] border-transparent"
                }`}
              >
                <Icon
                  className={`text-lg mr-2 ${active ? "text-[#0A6876]" : "text-[#6C6C6C]"}`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 md:hidden bg-white border-t w-full flex justify-around items-center p-2 shadow">
        {navItems?.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center ${
                active
                  ? "bg-[#114654] text-white rounded-2xl p-1.5"
                  : "text-[#3B3B3B]"
              }`}
            >
              <div className="flex  flex-row gap-1 items-center">
                <Icon
                  className={`text-lg ${
                    active ? "text-white " : "text-[#6C6C6C]"
                  }`}
                />
                {active && (
                  <span className="text-xs font-medium">{item.label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
