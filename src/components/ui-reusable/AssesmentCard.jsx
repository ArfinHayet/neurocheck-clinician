"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import p1 from "../../../public/svg/user-img.svg";
import Link from "next/link";
import { getAge } from "../utils/ageConverter";
import { timeConverter } from "../utils/timeconverter";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
const AssessmentCard = ({
  name,
  age,
  timeAgo,
  status,
  childCondition,
  description,
  onViewFullAssessment,
  onRateSummary,
  onAcceptCase,
  ratings,
  patientId,
  assessmentId
}) => {

  // console.log("answers",timeAgo)
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

// const generateConsultancyReport = (data) => {
//   const doc = new jsPDF({
//     orientation: "portrait",
//     unit: "pt",
//     format: "a4",
//   });

  // const pageWidth = doc.internal.pageSize.getWidth();
  // let y = 40;


  // doc.setFontSize(18);
  // doc.setTextColor("#1a1a1a");
  // doc.setFont(undefined, "bold");
  // doc.text("Report Structure ADHD Adult", 40, y);
  // y += 30;

  // doc.setFontSize(11);
  // doc.setFont(undefined, "normal");


//   const patientInfo = [
//     ["Patient Name", data.patientName],
//     ["Age", data.age],
//     ["Demographics", data.demographics],
//     ["Clinician Diagnosis", data.clinicianDiagnosis],
//     ["Diagnosis Recommendation", data.diagnosisRecommendation],
//   ];

//   patientInfo.forEach(([key, value]) => {
//     doc.setFont(undefined, "bold");
//     doc.text(`${key}:`, 40, y);
//     doc.setFont(undefined, "normal");
//     doc.text(`${value}`, 250, y);
//     y += 20;
//   });

//   y += 10;

 
//   const sections = [
//     { title: "Medical History Summary", content: data.medicalHistorySummary },
//     { title: "ASRS Summary", content: data.asrsSummary },
//     { title: "Weiss Rating Summary", content: data.weissSummary },
//     { title: "DIVA Summary", content: data.divaSummary },
//   ];

//   sections.forEach((section) => {
//     doc.setFontSize(13);
//     doc.setFont(undefined, "bold");
//     doc.text(section.title, 40, y);
//     y += 15;

//     doc.setFontSize(11);
//     doc.setFont(undefined, "normal");

//     const splitText = doc.splitTextToSize(section.content, pageWidth - 80);
//     doc.text(splitText, 40, y);
//     y += splitText.length * 14 + 20;
//   });

//   doc.save("consultancy-report.pdf");
// };

  




// const generateConsultancyReport = () => {
//   const doc = new jsPDF({
//     unit: "pt",
//     format: "a4",
//   });

//   // ------- TABLE DATA -------
//   const tableData = [
//     ["Patient Name", "XX YY"],
//     ["Age", "YY"],
//     ["Demographics", "XX"],
//     ["Clinician Diagnosis", ""],
//     ["Clinician Notes from Review", ""],
//     ["Clinician Notes Post Consultation", ""],
//     ["Diagnosis Recommendation", "Exhibits ADHD type XX / YY / ZZ"],
//   ];

//   // ------- TABLE STYLES -------
//   autoTable(doc, {
//     startY: 40,
//     head: [],
//     body: tableData,
//     theme: "grid",

//     styles: {
//       fontSize: 11,
//       cellPadding: 10,
//       valign: "middle",
//     },

//     columnStyles: {
//       0: { cellWidth: 150, fontStyle: "bold" }, // Left column
//       1: { cellWidth: 350 }, // Right column
//     },

//     tableWidth: 500,
//   });

//   // Download
//   doc.save("patient-info.pdf");
// };


//  const generateConsultancyReport = () => {
//   const doc = new jsPDF();

//   const leftX = 20;   // left column label
//   const midX = 70;    // right column value
//   const startY = 30;
//   let y = startY;

//   doc.setFontSize(20);
//   doc.text("Report Structure ADHD Adult", leftX, y);
//   y += 15;

//   doc.setFontSize(12);
//   doc.setFont("helvetica", "bold");
  
//   // Helper to print row
//   const printRow = (label, value) => {
//     doc.text(label, leftX, y);
//     doc.setFont("helvetica", "normal");
//     doc.text(value, midX, y);
//     doc.setFont("helvetica", "bold");
//     y += 10;
//   };

//   // Top Section — two-column format
//   printRow("Patient Name:", "John Doe");
//   printRow("Age:", "30");
//   printRow("Demographics:", "Male, Adult");
//   printRow("Clinician Diagnosis:", "ADHD Combined Type");
//   printRow("Diagnosis Recommendation:", "Continue evaluation");

//   // Gap before sections
//   y += 10;

//   // Section Writer (Bold title + normal text)
//   const writeSection = (title, text) => {
//     doc.setFont("helvetica", "bold");
//     doc.text(title, leftX, y);
//     y += 8;
//     doc.setFont("helvetica", "normal");
//     doc.text(text, leftX, y);
//     y += 12;
//   };

//   // All bottom sections (NOT TABLES)
//   writeSection("Medical History Summary", "Lorem ipsum dolor sit amet...");
//   writeSection("ASRS Summary", "Key areas rated very often...");
//   writeSection("Weiss Rating Summary", "# of items scored 2 or 3...");
//   writeSection("DIVA Summary", "# of childhood/adulthood criteria met...");

//   // Save
//   doc.save("Diagnosis_Report.pdf");
// };


const generateConsultancyReport = () => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  let y = 40; 

  // ------------------- TITLE -------------------
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#171717");
  doc.text("Report Structure ADHD Adult", 40, y);

  y += 25;

  // ------------------- TABLE DATA -------------------
  const tableData = [
    ["Patient Name", "XX YY"],
    ["Age", "YY"],
    ["Demographics", "XX"],
    ["Clinician Diagnosis", ""],
    ["Clinician Notes from Review", ""],
    ["Clinician Notes Post Consultation", ""],
    ["Diagnosis Recommendation", "Exhibits ADHD type XX / YY / ZZ"],
  ];

  autoTable(doc, {
    startY: y,
    head: [],
    body: tableData,
    theme: "grid",

    styles: {
      fontSize: 11,
      cellPadding: 10,
      valign: "middle",
    },

    columnStyles: {
      0: { cellWidth: 150, fontStyle: "bold" },
      1: { cellWidth: 350 },
    },

    tableWidth: 500,
  });

  // After table ends
  y = doc.lastAutoTable.finalY + 30;

  // ------------------- NORMAL SECTIONS -------------------
  const leftX = 40;

  const writeSection = (title, text) => {
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(title, leftX, y);
    y += 15;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const wrapped = doc.splitTextToSize(text, 500);
    doc.text(wrapped, leftX, y);
    y += wrapped.length * 12 + 15;
  };

  writeSection("Medical History Summary", "Lorem ipsum dolor sit amet...");
  writeSection("ASRS Summary", "Key areas rated very often...");
  writeSection("Weiss Rating Summary", "# of items scored 2 or 3...");
  writeSection("DIVA Summary", "# of childhood/adulthood criteria met...");

  // ------------------- SAVE PDF -------------------
  doc.save("consultancy-report.pdf");
};


  
  return (
    <div className="bg-[#FFFFFF] rounded-lg p-4 shadow-sm">
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

              {/* <button
                onClick={() => {
                  onBookVideo?.();
                  setMenuOpen(false);
                }}
                className="w-full cursor-pointer text-left px-4 py-2 text-sm border-b-2 border-[#F2F2F2] text-[#114654]"
                role="menuitem"
              >
                Book video consultancy
              </button> */}
              <button
                 onClick={() => 
    generateConsultancyReport({
      patientName: "John Doe",
      age: "30",
      demographics: "Male, Adult",
      clinicianDiagnosis: "ADHD Combined Type",
      diagnosisRecommendation: "Continue evaluation",
      medicalHistorySummary: "Lorem ipsum dolor sit amet...",
      asrsSummary: "Key areas rated very often...",
      weissSummary: "# of items scored 2 or 3...",
      divaSummary: "# of childhood/adulthood criteria met..."
    })
  }
                // onClick={() => {
                //   generateConsultancyReport({
                //     patientName: name,
                //     age,
                //     demographics: "XX",
                //     clinicianDiagnosis: "Exhibits ADHD type XX / YY / ZZ",
                //     diagnosisRecommendation: "Continue evaluation",
                //     medicalHistorySummary: "Lorem ipsum dolor sit amet...",
                //     asrsSummary: "Key areas rated very often...",
                //     weissSummary: "# of items scored 2 or 3...",
                //     divaSummary: "# of childhood/adulthood criteria met...",
                //   });
                //   setMenuOpen(false);
                // }}
                className="w-full cursor-pointer text-left px-4 py-2 text-sm border-b-2 border-[#F2F2F2] text-[#114654]"
              >
                Consultancy Report
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

      {/* Content */}
      <Link className="no-underline" href={`/assessment/${patientId}/${assessmentId}`}>
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
            <p className="px-2 py-0.5 mt-[8px]  rounded-md text-xs ">
              rating:{ratings}
            </p>
          </div>
          <p className="text-[#3C3C4399] text-xs mt-1">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default AssessmentCard;
