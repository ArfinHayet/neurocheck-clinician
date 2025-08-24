"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import p1 from '../../../public/svg/Ellipse 439.svg'
import { LuLayoutDashboard } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { PiClipboardTextThin } from "react-icons/pi";
import { BsClipboard2Data } from "react-icons/bs";
import Image from "next/image";
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

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

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
          <h2 className="text-lg font-semibold">Dr. Eleanor Hughes</h2>
          <p className="text-sm text-gray-500">
            Consultant Neurodevelopmental Specialist
          </p>
          <p className="mt-4 text-xl font-bold">25 Apr</p>
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
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center ${
                active ? "text-[#114654]" : "text-[#3B3B3B]"
              }`}
            >
              <Icon className={`text-xl ${active ? "text-[#114654]" : "text-[#6C6C6C]"}`} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};
