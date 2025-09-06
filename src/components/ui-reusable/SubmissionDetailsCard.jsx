"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import p1 from "../../../public/svg/user-img.svg";
import Link from "next/link";
import { getAge } from "../utils/ageConverter";
import { timeConverter } from "../utils/timeconverter";
// import  { getAge,timeConverter } from "../utils/ageConverter";

const SubmissionDetailsCard = ({
  name,
  age,
  timeAgo,
  status,
  childCondition,
  description,
  onViewFullAssessment,
  onRateSummary,
  onBookVideo,
  onAcceptCase,
  ratings,
  patientId
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const colors = {
    completed: "bg-[#EBF6EC] text-[#4CAF50]",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
  };

  const statusKey =
    status && status.trim() !== "" ? status.toLowerCase() : "pending";
  const statusClass = colors[statusKey] || colors.pending;

  return (
    <div className="pt-12">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <Image
            src={p1}
            alt={name || "User"}
            height={40}
            width={40}
            className="w-10 h-10 rounded-full"
            priority
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{name}</h2>
              <span
                className={`px-2 py-0.5 md:block hidden rounded-md text-xs ${statusClass}`}
              >
                {/* {(status || "").toUpperCase()} */}
                {status && status.trim() !== ""
                  ? status.toUpperCase()
                  : "PENDING"}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {getAge(age)} years • {timeConverter(timeAgo)}
            </p>
          </div>
        </div>

        {/* Three-dot menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1 rounded hover:bg-gray-100 cursor-pointer"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="More options"
          >
            <FiMoreVertical size={20} />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md z-10"
            >
              <button
                onClick={() => {
                  onViewFullAssessment?.();
                  setMenuOpen(false);
                }}
                className="w-full cursor-pointer text-left px-4 py-2 text-sm border-b-2 border-[#F2F2F2] text-[#114654]"
                role="menuitem"
              >
                View full assessment
              </button>
              <button
                onClick={() => {
                  onRateSummary?.();
                  setMenuOpen(false);
                }}
                className="w-full cursor-pointer text-left px-4 py-2 text-sm border-b-2 border-[#F2F2F2] text-[#114654]"
                role="menuitem"
              >
                Rate this summary
              </button>

              <button
                onClick={() => {
                  onBookVideo?.();
                  setMenuOpen(false);
                }}
                className="w-full cursor-pointer text-left px-4 py-2 text-sm border-b-2 border-[#F2F2F2] text-[#114654]"
                role="menuitem"
              >
                Book video consultancy
              </button>
              {status !== "completed" && (
                <button
                  onClick={() => {
                    onAcceptCase?.();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 cursor-pointer text-sm text-[#114654]"
                  role="menuitem"
                >
                  Accept this case
                </button>
              )}
            </div>
          )}
        </div>
      </div>

    
        <div className="flex-1 mt-5">
          <div className="flex flex-row gap-2">
            <p className="font-semibold text-sm mt-2 text-[#4B4B4B]">
              {childCondition}
            </p>
            <p
              className={`px-2 py-0.5 mt-[10px] md:hidden rounded-md text-xs ${statusClass}`}
            >
              {(status || "").toUpperCase()}
            </p>
            <p
              className="px-2 py-0.5 mt-[8px]  rounded-md text-xs "
            >
              rating:{ratings}
            </p>
          </div>
          <p className="text-[#3C3C4399] text-xs mt-1">{description}</p>
        </div>
      
    </div>
  );
};

export default SubmissionDetailsCard;

