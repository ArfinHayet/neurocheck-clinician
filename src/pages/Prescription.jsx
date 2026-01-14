"use client";
import { addAppointment, getSubmissionById } from "@/api/assessment";
import Header from "@/components/ui-reusable/Header";
import { getAge } from "@/components/utils/ageConverter";
import { formatDate } from "@/components/utils/formateDate";
import { AuthContext } from "@/Provider/AuthProvider";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Prescription = () => {
  const [patientDetailsById, setPatientDetailsById] = useState([]);
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [meds, setMeds] = useState([]);
  const { userData } = useContext(AuthContext) || {};
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [needsAppointment, setNeedsAppointment] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");

  const params = useParams();
  const id = params?.id ?? null;

  //console.log("ppppp",id)

  if (!id) {
    return <div>Loading...</div>;
  }

  const getSubmissionDetails = async () => {
    const result = await getSubmissionById(id);
    //console.log("sss",result?.payload);
    setPatientDetailsById(result?.payload);
  };

  useEffect(() => {
    getSubmissionDetails();
  }, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      userId: patientDetailsById?.[0]?.userId,
      patientId: patientDetailsById?.[0]?.patientId,
      time: appointmentDate,
      clinicianId: userData?.id,
      diagnosis: diagnosis,
      notes_from_review: notes,
      status: "Confirmed",
      metting_status: "Scheduled",
      tries:1
    };

    //console.log("apppp", payload);

    const result = await addAppointment(payload);

    //console.log("re", result);
    if (result) {
      setMeds([]);
      setNotes("");
      setShowSuccessModal(true);
    }

    //console.log("submit", payload);
  };


const item = patientDetailsById?.[0];
  



  return (
    <div className="p-6 lg:p-0 min-h-screen ">
      <Header
        title="Clinician Feedback & Prescription"
        description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
      />
      <div className="w-full lg:w-4/6 border border-[#DFDFDF] rounded p-4 flex flex-row gap-9">
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold text-[#000000]">
            {userData?.name}
          </h2>
          <p className="text-sm text-[#534F4F]">{userData?.certification}</p>
          <p className="text-sm text-[#534F4F]">{userData?.email}</p>
          <p className="text-sm text-[#534F4F]">{userData?.phone}</p>
        </div>

        <div className="w-2/3 border-l md:border-l border-[#DFDFDF]  pl-6 text-sm text-gray-700">
          {/* {patientDetailsById?.[0].map((item, i) => ( */}
          <div
            // key={i}
            className="grid grid-cols-2 gap-2">
              <div>Patient name</div>
              <div className="font-medium">: {item?.patient?.name}</div>
              <div>Age</div>
              <div className="font-medium">
                : {getAge(item?.patient?.dateOfBirth)}
              </div>
              <div>Sex</div>
              <div className="font-medium">: {item?.patient?.gender}</div>
              <div>Date</div>
              <div className="font-medium">: {formatDate(item?.createdAt)}</div>
            </div>
          {/* ))} */}
        </div>
      </div>

      {/* Form */}
      <form className="mt-8" onSubmit={handleSubmit}>
        <label className="block font-medium text-sm text-[#3B3B3B] mb-2">
          Clinician Diagnosis
        </label>
        <p className="text-xs text-[#3C3C4399] pb-3">
          Write your feedback, observations, suggestions, recommendations,
          instructions and follow up information
        </p>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="w-full lg:w-4/6 h-20 rounded border border-[#E2E2E2] p-4 bg-gray-50 resize-none outline-none"
        />
        <label className="block font-medium text-sm text-[#3B3B3B] mb-2">
          Clinician Notes from Review
        </label>
        <p className="text-xs text-[#3C3C4399] pb-3">
          Write your feedback, observations, suggestions, recommendations,
          instructions and follow up information
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full lg:w-4/6 h-36 rounded border border-[#E2E2E2] p-4 bg-gray-50 resize-none outline-none"
        />

        <div className="mt-6">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={needsAppointment}
              onChange={(e) => setNeedsAppointment(e.target.checked)}
              className="form-checkbox h-4 w-4 text-[#0A4863] border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-[#3B3B3B]">
              Need Appointment Schedule
            </span>
          </label>

          <p className="text-xs text-[#3C3C4399] mt-2">
            Select this if you want to schedule a follow-up appointment.
          </p>

          {needsAppointment && (
            <div className="relative w-full lg:w-4/6 mt-4">
              <input
                type="datetime-local"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-[#E2E2E2] rounded bg-[#F9F9F9] text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0A4863]"
              />
            </div>
          )}
        </div>

        <div className="mt-8 mb-9">
          <button
            className="w-4/6 cursor-pointer bg-[#0A4863] text-white rounded-full py-2 shadow"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {showSuccessModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center w-96">
            <h2 className="text-xl font-semibold -600 mb-4">
              ✅ Prescription Submitted
            </h2>
            <p className="text-gray-600 mb-6">
              Your prescription has been successfully saved.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowSuccessModal(false)}
                className=" border-2 border-[#0A4863] text-[#0A4863] px-6 py-2 rounded-xl"
              >
                Save appointment Date
              </button>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-[#0A4863] text-white px-6 py-2  rounded-xl"
              >
                Go to dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescription;
