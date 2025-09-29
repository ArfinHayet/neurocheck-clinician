"use client";
import { addPrescription, getSubmissionByPatientId } from "@/api/assessment";
import Header from "@/components/ui-reusable/Header";
import { getAge } from "@/components/utils/ageConverter";
import { formatDate } from "@/components/utils/formateDate";
import { AuthContext } from "@/Provider/AuthProvider";
// import { AuthContext } from "../Provider/AuthProvider";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Prescription = () => {
  const [patientDetailsById, setPatientDetailsById] = useState([]);
  const [notes, setNotes] = useState("");
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [meds, setMeds] = useState([]);
  const { userData } = useContext(AuthContext) || {};
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // console.log(userData);
  const { id } = useParams();
  // console.log(id);

  const getSubmissionDetails = async () => {
    const result = await getSubmissionByPatientId(id);
    console.log(result?.payload);
    setPatientDetailsById(result?.payload);
  };

  useEffect(() => {
    getSubmissionDetails();
  }, [id]);

  const addMedication = () => {
    if (!medName) return;
    setMeds((prev) => [
      ...prev,
      {
        name: medName,
        dosage: dosage || "-",
        frequency: frequency || "-",
        duration: duration || "-",
      },
    ]);
    setMedName("");
    setDosage("");
    setFrequency("");
    setDuration("");
  };

  const removeMedication = (index) => {
    setMeds((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const medicineStr = meds.map((m, i) => `med-${i + 1}:${m.name}`).join(", ");
    const dosageStr = meds.map((m) => m.dosage).join(", ");
    const frequencyStr = meds.map((m) => m.frequency).join(", ");
    const durationStr = meds.map((m) => m.duration).join(", ");

    const payload = {
      assessmentId: patientDetailsById?.[0]?.assessmentId,
      userId: userData?.id,
      patientId: patientDetailsById?.[0]?.patientId,
      observation: notes,
      medicine: medicineStr,
      dosage: dosageStr,
      frequency: frequencyStr,
      duration: durationStr,
      clinicianId: userData?.id,
    };

    const result = await addPrescription(payload);
    if (result) {
      setMeds([]);
      setNotes("");
      setShowSuccessModal(true);
    }

    console.log("submit", payload);
  };

  return (
    <div className="p-6 lg:p-0">
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
          {patientDetailsById?.map((item, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
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
          ))}
        </div>
      </div>

      {/* Form */}
      <form className="mt-8" onSubmit={handleSubmit}>
        <label className="block font-medium text-sm text-[#3B3B3B] mb-2">
          Clinical observations
        </label>
        <p className="text-xs text-[#3C3C4399] pb-3">
          Write your feedback, observations, suggestions, recommendations,
          instructions and follow up information
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full lg:w-4/6 h-56 rounded border border-[#E2E2E2] p-4 bg-gray-50 resize-none outline-none"
        />

        {/* Medication input row */}
        {/* <div className="mt-6 w-[73%]">
          <p className="font-semibold text-lg text-[#3B3B3B]">
            Prescribed medications
          </p>
          <div className="flex flex-wrap gap-2 mt-4 items-center">
            <input
              className="flex-1 md:flex-none w-2/6 bg-[#FFFFFF] border-[#E1E1E1] rounded border  p-2 text-sm outline-none"
              placeholder="Medication Name"
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
            />
            <input
              className="w-1/6 rounded border bg-[#FFFFFF] border-[#E1E1E1] p-2 text-sm outline-none"
              placeholder="Dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
            <input
              className="flex-1 md:flex-none w-1/6 rounded border bg-[#FFFFFF] border-[#E1E1E1] p-2 text-sm outline-none"
              placeholder="Frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <input
              className="w-1/6 rounded border bg-[#FFFFFF] border-[#E1E1E1] p-2 text-sm outline-none"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />

            <button
              type="button"
              onClick={addMedication}
              className="ml-2 cursor-pointer bg-white border-none rounded px-3 py-2 shadow-sm text-sm"
            >
              +
            </button>
          </div>

       
          <div className="mt-6 w-5/6">
            {meds.length > 0 && (
              <div className=" overflow-hidden">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-left font-bold text-[#5A5A5A]">
                    <tr>
                      <th className="p-3"></th>
                      <th className="p-3">Medication Name</th>
                      <th className="p-3">Dosage</th>
                      <th className="p-3">Frequency</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3"> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {meds.map((m, i) => (
                      <tr key={i} className="border-t border-[#E3E3E3]">
                        <td className="p-3 align-top text-[#5A5A5A]">
                          {i + 1}.
                        </td>
                        <td className="p-3 align-top">{m.name}</td>
                        <td className="p-3 align-top">{m.dosage}</td>
                        <td className="p-3 align-top">{m.frequency}</td>
                        <td className="p-3 align-top">{m.duration}</td>
                        <td className="p-3 align-top">
                          <button
                            type="button"
                            onClick={() => removeMedication(i)}
                            className="text-red-500 text-xs"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div> */}

        <div className="mt-8">
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




