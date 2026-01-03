"use client";
// import { getSubmissionByPatientId } from "@/api/assessment";
// import Header from "@/components/ui-reusable/Header";
// import SubmissionDetailsCard from "@/components/ui-reusable/SubmissionDetailsCard";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import AdditionalInfoModal from "./AdditionalInfoModal";
// import { useParams } from "next/navigation";

// const AssessmentDetails = () => {
//   // const { patientId } = useParams();

//   const params = useParams();
//   const patientId = params?.patientId ?? null;
//   const assessmentId = params?.assessmentId ?? null;

//   if (!patientId) {
//     return <div>Loading...</div>;
//   }
  
//   const [submission, setSubmission] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   const getSubmissionDetails = async () => {
//     const result = await getSubmissionByPatientId(patientId, assessmentId);

//     console.log("details",result)
  
//      const grouped = Object.values(result?.payload?.reduce((acc, item) => {
//         const key = `${item.patientId}-${item.assessmentId}-${item.userId}`;
//       //  const key = `${item?.assessmentId}`;
       
//        console.log("keyyyy",key)

//         if (!acc[key]) {
//           acc[key] = {
//             patientId: item.patientId,
//             assessmentId: item.assessmentId,
//             userId: item.userId,
//             patient: item.patient,
//             assessment: item.assessment,
//             user: item.user,
//             summaries: [],
//           };
//         }

//         acc[key].summaries.push({
//           questionType: item.questionType,
//           summary: item.summary,
//         });

//         return acc;
//       }, {}),
//     );
//     console.log("%%%",grouped)
//     setSubmission(grouped);
//   };

//   useEffect(() => {
//     getSubmissionDetails();
//   }, [patientId]);

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };
//   return (
//     <div className="p-6 lg:p-0 min-h-screen mb-5">
//       <Header
//         title="Assessment"
//         description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
//       />
//       {submission?.map((item, index) => (
//         <SubmissionDetailsCard
//           key={index}
//           patientId={item?.id}
//           name={item?.patient?.name}
//           age={item?.patient?.dateOfBirth}
//           timeAgo={item?.createdAt}
//           status={item?.status}
//           summary = {item?.summaries}
//           ratings={item?.ratings}
//           childCondition={item?.assessment?.category}
//           description={item?.assessment?.description}
//           onViewFullAssessment={() => handleView(item)}
//           onRateSummary={() => handleViewRate(item?.id)}
//           onAcceptCase={() => handleAccept(item?.id)}
//         />
//       ))}
//       <div className="p-5 flex flex-row justify-end gap-2">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="border border-[#114654] text-[#114654] rounded-2xl p-2 text-xs cursor-pointer"
//         >
//           Ask additional info
//         </button>
//         {/* <Link href="/prescription"> */}
//         <Link href={`/prescription/${patientId}`}>
//           <button className="bg-[#114654] text-white rounded-2xl p-2 text-xs cursor-pointer">
//             Make diagnosis report
//           </button>
//         </Link>
//       </div>
//        {submission?.map((item, index) => (
//         <AdditionalInfoModal
//         key={index}
//         additionalInfo={item?.additionalInfo}
//         patientId={patientId}
//         isModalOpen={isModalOpen} closeModal={closeModal} /> ))}
//     </div>
//   );
// };

// export default AssessmentDetails;



// "use client";

// import { getSubmissionByPatientId } from "@/api/assessment";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import AdditionalInfoModal from "./AdditionalInfoModal";
// import Header from "@/components/ui-reusable/Header";
// import SubmissionDetailsCard from "@/components/ui-reusable/SubmissionDetailsCard";
// import { getAge } from "@/components/utils/ageConverter";

// const AssessmentDetails = () => {
//   const params = useParams();
//   const patientId = params?.patientId;
//   const assessmentId = params?.assessmentId;

//   const [submission, setSubmission] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("summary");

//   useEffect(() => {
//     if (patientId) getSubmissionDetails();
//   }, [patientId]);

//   const getSubmissionDetails = async () => {
//     const result = await getSubmissionByPatientId(patientId, assessmentId);
//     console.log("resulttttt", result);

//     const grouped = Object.values(
//       result?.payload?.reduce((acc, item) => {
//         const key = `${item.patientId}-${item.assessmentId}-${item.userId}`;

//         if (!acc[key]) {
//           acc[key] = {
//             patient: item.patient,
//             assessment: item.assessment,
//             status: item.status,
//             summaries: [],
//           };
//         }

//         acc[key].summaries.push({
//           questionType: item.questionType,
//           summary: item.summary,
//         });

//         return acc;
//       }, {})
//     );

//     console.log("assessment", grouped)


//     setSubmission(grouped);
//   };

//   const data = submission?.[0];

//   if (!data) return <div className="p-6">Loading...</div>;

//     const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-6">
//         <Header
//         title="Assessment"
//         description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
//       />
//       {/* ================= PROFILE HEADER ================= */}
//       <div className="bg-[#fbf8f6] rounded-xl p-6">
//         <h1 className="text-2xl font-semibold">
//           {data?.patient?.name}
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Assessment last updated recently
//         </p>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
//           <Info label="Age"  value={`${getAge(data?.patient?.dateOfBirth)} years`}/>
//           <Info label="Assessment" value={data?.assessment?.category} />
//           <Info label="Status" value={data?.status} />
//           <Info label="Type" value="Patient Assessment" />
//         </div>
//       </div>

//       {/* ================= TABS ================= */}
//       <div className="border-b flex gap-6 text-sm font-medium">
//         {["AI Summary", "View Assessment details","Consultancy Report"].map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`pb-3 capitalize ${
//               activeTab === tab
//                 ? "border-b-2 border-[#114654] text-[#114654]"
//                 : "text-gray-500"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* ================= TABLE (LIKE ACCOUNTS LIST) ================= */}
//       {activeTab === "AI Summary" && (
//         <div className="">
//           {/* <div className="p-4 font-medium">
//             Assessment Summary
//           </div> */}

//            <div className="p-6 lg:p-0 min-h-screen mb-5">
    
//       {submission?.map((item, index) => (
//         <SubmissionDetailsCard
//           key={index}
//           patientId={item?.id}
//           name={item?.patient?.name}
//           age={item?.patient?.dateOfBirth}
//           timeAgo={item?.createdAt}
//           status={item?.status}
//           summary = {item?.summaries}
//           ratings={item?.ratings}
//           childCondition={item?.assessment?.category}
//           description={item?.assessment?.description}
//           onViewFullAssessment={() => handleView(item)}
//           onRateSummary={() => handleViewRate(item?.id)}
//           onAcceptCase={() => handleAccept(item?.id)}
//         />
//       ))}
//       {/* <div className="p-5 flex flex-row justify-end gap-2">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="border border-[#114654] text-[#114654] rounded-2xl p-2 text-xs cursor-pointer"
//         >
//           Ask additional info
//         </button>
//         <Link href={`/prescription/${patientId}`}>
//           <button className="bg-[#114654] text-white rounded-2xl p-2 text-xs cursor-pointer">
//             Make diagnosis report
//           </button>
//         </Link>
//       </div> */}
//        {submission?.map((item, index) => (
//         <AdditionalInfoModal
//         key={index}
//         additionalInfo={item?.additionalInfo}
//         patientId={patientId}
//         isModalOpen={isModalOpen} closeModal={closeModal} /> ))}
//     </div>

//           {/* <table className="w-full text-sm">
//             <thead className="bg-gray-50 text-gray-600">
//               <tr>
//                 <th className="text-left p-4">Question Type</th>
//                 <th className="text-left p-4">Summary</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data?.summaries?.map((item, index) => (
//                 <tr key={index} className="border-t">
//                   <td className="p-4 font-medium">
//                     {item.questionType}
//                   </td>
//                   <td className="p-4 text-gray-600">
//                     {item.summary}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table> */}
//         </div>
//       )}

//       {/* ================= ACTION BUTTONS ================= */}
//       <div className="flex justify-end gap-3">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="border border-[#114654] text-[#114654] px-4 py-2 rounded-full text-sm"
//         >
//           Ask additional info
//         </button>

//         <Link href={`/prescription/${patientId}`}>
//           <button className="bg-[#114654] text-white px-4 py-2 rounded-full text-sm">
//             Make diagnosis report
//           </button>
//         </Link>
//       </div>

//       <AdditionalInfoModal
//         isModalOpen={isModalOpen}
//         closeModal={() => setIsModalOpen(false)}
//         patientId={patientId}
//       />
//     </div>
//   );
// };

// export default AssessmentDetails;


// const Info = ({ label, value }) => (
//   <div>
//     <p className="text-gray-500 uppercase text-xs">{label}</p>
//     <p className="font-medium mt-1">{value}</p>
//   </div>
// );



// "use client";

// import { getSubmissionByPatientId } from "@/api/assessment";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import AdditionalInfoModal from "./AdditionalInfoModal";
// import Header from "@/components/ui-reusable/Header";
// import SubmissionDetailsCard from "@/components/ui-reusable/SubmissionDetailsCard";
// import { getAge } from "@/components/utils/ageConverter";
// import SubmissionDetails from "./SubmissionDetails";

// const tabs = ["AI Summary", "View Assessment details", "Consultancy Report"];

// const AssessmentDetails = () => {
//   const params = useParams();
//   const patientId = params?.patientId;
//   const assessmentId = params?.assessmentId;

//   const [submission, setSubmission] = useState([]);
//   const [activeTab, setActiveTab] = useState(tabs[0]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     if (patientId) getSubmissionDetails();
//   }, [patientId]);

//   const getSubmissionDetails = async () => {
//     const result = await getSubmissionByPatientId(patientId, assessmentId);

//     console.log("resulttttt", result);

//     const grouped = Object.values(
//       result?.payload?.reduce((acc, item) => {
//         const key = `${item.patientId}-${item.assessmentId}-${item.userId}`;

//         if (!acc[key]) {
//           acc[key] = {
//             patient: item.patient,
//             assessment: item.assessment,
//             status: item.status,
//             createdAt: item.createdAt,
//             summaries: [],
//           };
//         }

//         acc[key].summaries.push({
//           questionType: item.questionType,
//           summary: item.summary,
//         });

//         return acc;
//       }, {})
//     );

//   console.log("resultttttgroup", grouped);

//     setSubmission(grouped);
//   };

//   const data = submission?.[0];
//   if (!data) return <div className="p-6">Loading...</div>;

//   const currentTabIndex = tabs.indexOf(activeTab);
//   const isFirstTab = currentTabIndex === 0;
//   const isLastTab = currentTabIndex === tabs.length - 1;

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-6">
//       <Header
//         title="Assessment"
//         description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
//       />

//       {/* ================= PROFILE HEADER ================= */}
//       <div className="bg-[#fbf8f6] rounded-xl p-6">
//         <h1 className="text-2xl font-semibold">{data?.patient?.name}</h1>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
//           <Info
//             label="Age"
//             value={`${getAge(data?.patient?.dateOfBirth)} years`}
//           />
//           <Info label="Assessment" value={data?.assessment?.category} />
//           <Info label="Status" value={data?.status} />
//           <Info label="Type" value="Patient Assessment" />
//         </div>
//       </div>

//       {/* ================= TABS ================= */}
//       <div className="border-b flex gap-6 text-sm font-medium">
//         {tabs.map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`pb-3 ${
//               activeTab === tab
//                 ? "border-b-2 border-[#114654] text-[#114654]"
//                 : "text-gray-500"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* ================= TAB CONTENT ================= */}
//       {activeTab === "AI Summary" && (
//         <div className="p-6 lg:p-0">
//           {submission.map((item, index) => (
//             <SubmissionDetailsCard
//               key={index}
//               name={item?.patient?.name}
//               status={item?.status}
//               summary={item?.summaries}
//               childCondition={item?.assessment?.category}
//               description={item?.assessment?.description}
//             />
//           ))}
//         </div>
//       )}

//       {activeTab === "View Assessment details" && (
//         <div className="p-6 bg-gray-50 rounded-xl">
//           {submission.map((item, index) => (
//             <SubmissionDetails
//               key={index}
//               // isModalOpen={isModalOpen}
//               // closeModal={closeModal}
//               patientId={item?.patientId?.id}
//               time={item?.createdAt}
//               score={item?.score}
//               assessmentId={item?.assessmentId}
//             />))}
//         </div>
//       )}

//       {activeTab === "Consultancy Report" && (
//         <div className="p-6 bg-gray-50 rounded-xl">
//           Consultancy report content here
//         </div>
//       )}

//       {/* ================= NAVIGATION BUTTONS ================= */}
//       {/* <div className="flex justify-between pt-6">
      
//         {!isFirstTab && (
//           <button
//             onClick={() => setActiveTab(tabs[currentTabIndex - 1])}
//             className="border border-[#114654] text-[#114654] px-5 py-2 rounded-full text-sm"
//           >
//             Previous
//           </button>
//         )}

//         <div className="ml-auto flex gap-3">
       
//           {!isLastTab && (
//             <button
//               onClick={() => setActiveTab(tabs[currentTabIndex + 1])}
//               className="bg-[#114654] text-white px-5 py-2 rounded-full text-sm"
//             >
//               Next
//             </button>
//           )}

          
//           {isLastTab && (
//             <Link href={`/prescription/${patientId}`}>
//               <button className="bg-[#114654] text-white px-5 py-2 rounded-full text-sm">
//                 Make diagnosis report
//               </button>
//             </Link>
//           )}
//         </div>
//       </div> */}


//       {/* ================= NAVIGATION BUTTONS ================= */}
{/* <div className="flex items-end justify-end gap-2 pt-6">
  {/* Previous */}
//   <div>
//     {!isFirstTab && (
//       <button
//         onClick={() => setActiveTab(tabs[currentTabIndex - 1])}
//         className="border border-[#114654] text-[#114654] px-5 py-2 rounded-full text-sm"
//       >
//         Previous
//       </button>
//     )}
//   </div>

//   {/* Right side actions */}
//   <div className="flex gap-3">
//     {/* Next */}
//     {!isLastTab && (
//       <button
//         onClick={() => setActiveTab(tabs[currentTabIndex + 1])}
//         className="bg-[#114654] text-white px-5 py-2 rounded-full text-sm"
//       >
//         Next
//       </button>
//     )}

//     {/* Only last tab */}
//     {isLastTab && (
//       <Link href={`/prescription/${patientId}`}>
//         <button className="bg-[#114654] text-white px-5 py-2 rounded-full text-sm">
//           Make diagnosis report
//         </button>
//       </Link>
//     )}
//   </div>
// </div> */}


//       <AdditionalInfoModal
//         isModalOpen={isModalOpen}
//         closeModal={() => setIsModalOpen(false)}
//         patientId={patientId}
//       />
//     </div>
//   );
// };

// export default AssessmentDetails;

// /* ================= INFO ================= */
// const Info = ({ label, value }) => (
//   <div>
//     <p className="text-gray-500 uppercase text-xs">{label}</p>
//     <p className="font-medium mt-1">{value}</p>
//   </div>
// );









////////////////////////////////////////////// new ///////////////////////




// "use client";

import { getAllappointments, getSubmissionByPatientId, updateSchedule } from "@/api/assessment";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/ui-reusable/Header";
import SubmissionDetailsCard from "@/components/ui-reusable/SubmissionDetailsCard";
import SubmissionDetails from "./SubmissionDetails";
import { getAge } from "@/components/utils/ageConverter";
import { AuthContext } from "@/Provider/AuthProvider";
import ReportStructure from "./ReportStructure";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Modal from "@/components/ui-reusable/Modal";

const tabs = ["AI Summary", "View Assessment details", "Consultancy Report"];

const AssessmentDetails = () => {
  const { patientId, assessmentId } = useParams();

  console.log("w12",assessmentId)
  const { userData } = useContext(AuthContext) || {};

  const [submission, setSubmission] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // 🔹 Feedback modal states
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  /* ---------------- FETCH APPOINTMENTS ---------------- */
  const fetchAppointments = async () => {
    const res = await getAllappointments();
    const rawData = res?.payload?.filter(
      (i) => i?.clinicianId === Number(userData?.id)
    );
    setAppointment(rawData || []);
  };


  console.log("appp",appointment)

  useEffect(() => {
    if (userData?.id) fetchAppointments();
  }, [userData?.id]);

  /* ---------------- FETCH SUBMISSION ---------------- */
  const fetchSubmission = async () => {
    const result = await getSubmissionByPatientId(patientId, assessmentId);

    console.log("111",result)

    const grouped = Object.values(
      result?.payload?.reduce((acc, item) => {
        const key = `${item.patientId}-${item.assessmentId}`;

        if (!acc[key]) {
          acc[key] = {
            patient: item.patient,
            assessment: item.assessment,
            assessmentId: item.assessmentId,
            status: item.status,
            createdAt: item.createdAt,
            summaries: [],
            score: item.score,
          };
        }

        acc[key].summaries.push({
          questionType: item.questionType,
          summary: item.summary,
        });

        return acc;
      }, {})
    );

    console.log("submission group", grouped);

    setSubmission(grouped || []);
  };

  useEffect(() => {
    if (patientId) fetchSubmission();
  }, [patientId]);

  const data = submission[0];
  if (!data) return <div className="p-6">Loading...</div>;

  /* ---------------- TAB UTILS ---------------- */
  const index = tabs.indexOf(activeTab);
  const isFirst = index === 0;
  const isLast = index === tabs.length - 1;

  /* ---------------- APPOINTMENT LOGIC ---------------- */
  const submissionPatientId = data?.patient?.id;

  const patientAppointment = appointment?.find(
    (a) => a?.patientId === submissionPatientId
  );

console.log("aaaaaaaaaaaa",patientAppointment)


  const hasAppointmentForPatient = Boolean(patientAppointment);

  const isReportGenerated =
    patientAppointment?.status
      ?.toString()
      .trim()
      .toLowerCase() === "confirmed";

  const hasFeedback = patientAppointment?.feedback !== null;
  console.log("feeeeee",hasFeedback)


  /* ---------------- PDF GENERATE ---------------- */
  const generateConsultancyReport = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    let y = 40;
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Consultancy Report", 40, y);

    y += 25;

    autoTable(doc, {
      startY: y,
      body: [
        ["Patient Name", data.patient.name],
        ["Age", `${getAge(data.patient.dateOfBirth)} years`],
        ["Assessment", data.assessment.category],
      ],
      theme: "grid",
      styles: { fontSize: 11, cellPadding: 8 },
      columnStyles: {
        0: { cellWidth: 150, fontStyle: "bold" },
        1: { cellWidth: 350 },
      },
    });

    doc.save("consultancy-report.pdf");
  };

  /* ---------------- FEEDBACK SUBMIT ---------------- */
  const closeFeedBackModal = () => {
    setFeedbackModal(false);
    setNotes("");
    setSelectedAppointment(null);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    const payload = {
      feedback: notes,
    };
    console.log("payload", payload);
    await updateSchedule(selectedAppointment.id, payload);

    closeFeedBackModal();
    fetchAppointments();
  };

  /* ======================= UI ======================= */
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Header title="Assessment" />

      {/* PROFILE */}
      <div className="bg-[#fbf8f6] rounded-xl p-6">
        <h1 className="text-2xl font-semibold">{data.patient.name}</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
          <Info label="Age" value={`${getAge(data.patient.dateOfBirth)} years`} />
          <Info label="Assessment" value={data.assessment.category} />
          <Info label="Status" value={data.status} />
          <Info label="Type" value="Patient Assessment" />
        </div>
      </div>

      {/* TABS */}
      <div className="border-b flex gap-6 text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 ${
              activeTab === tab
                ? "border-b-2  cursor-pointer border-[#114654] text-[#114654]"
                : "text-gray-500 cursor-pointer"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {activeTab === "AI Summary" &&
        submission.map((item, i) => (
          <SubmissionDetailsCard
            key={i}
            name={item.patient.name}
            status={item.status}
            summary={item.summaries}
            childCondition={item.assessment.category}
          />
        ))}

      {activeTab === "View Assessment details" &&
        submission.map((item, i) => (
          <SubmissionDetails
            key={i}
            patientId={item.patient.id}
            assessmentId={item?.assessmentId}
            time={item.createdAt}
            score={item.score}
          />
        ))}

      {activeTab === "Consultancy Report" && (
        <ReportStructure data={{
          patientName: data.patient.name,
          age: getAge(data.patient.dateOfBirth),
          demographics: data.patient.demographics,
          clinicianDiagnosis: patientAppointment?.diagnosis || "",
          reviewNotes: patientAppointment?.notes_from_review || "",
          postConsultNotes: patientAppointment?.feedback || "",
         }} />
      )}

      {/* FOOTER ACTIONS */}
      <div className="flex justify-end gap-3 pt-6">
        {!isFirst && (
          <button
            onClick={() => setActiveTab(tabs[index - 1])}
            className="border border-[#114654] text-[#114654] px-5 py-2 text-xs rounded-full"
          >
            Previous
          </button>
        )}

        {!isLast && (
          <button
            onClick={() => setActiveTab(tabs[index + 1])}
            className="bg-[#114654] text-white px-5 py-2 text-xs rounded-full"
          >
            Next
          </button>
        )}

        {isLast && (
          <>
            {isReportGenerated && (
              <button
                onClick={generateConsultancyReport}
                className="bg-[#114654] text-white px-5 py-2 text-xs rounded-full"
              >
                Download Report
              </button>
            )}

            {isReportGenerated && !hasFeedback && (
              <button
                onClick={() => {
                  setSelectedAppointment(patientAppointment);
                  setFeedbackModal(true);
                }}
                className="bg-[#114654] text-white px-5 py-2 text-xs rounded-full"
              >
                Add Feedback
              </button>
            )}

            {!hasAppointmentForPatient && (
              <Link href={`/prescription/${patientId}`}>
                <button className="bg-[#114654] text-white px-5 py-2 text-xs rounded-full">
                  Make diagnosis report
                </button>
              </Link>
            )}
          </>
        )}
      </div>

      {/* FEEDBACK MODAL */}
      <Modal
        classname="w-[65vw] lg:w-[34vw]"
        isOpen={feedbackModal}
        closeModal={closeFeedBackModal}
        title="Post Appointment Feedback"
      >
        <form onSubmit={handleSubmitFeedback}>
          <label className="block font-medium text-sm mb-2">
            Clinician Notes Post Consultation
          </label>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-36 rounded border p-4"
            required
          />

          <button
            type="submit"
            className="w-full mt-4 bg-[#0A4863] text-white py-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AssessmentDetails;

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500 uppercase text-xs">{label}</p>
    <p className="font-medium mt-1">{value}</p>
  </div>
);
