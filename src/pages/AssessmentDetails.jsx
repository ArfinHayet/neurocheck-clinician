"use client";
import Header from "@/components/ui-reusable/Header";
import Modal from "@/components/ui-reusable/Modal";
import Link from "next/link";
import { useState } from "react";

const AssessmentDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medName, setMedName] = useState("");
   const [meds, setMeds] = useState([]);
    const addMedication = () => {
    if (!medName) return;
    setMeds((prev) => [
      ...prev,
      {
        name: medName
      }
    ]);
    setMedName("");
  };

  const removeMedication = (index) => {
    setMeds((prev) => prev.filter((_, i) => i !== index));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Header
        title="Assessment"
        description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
      />
      <div className="p-5 flex flex-row gap-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="border border-[#114654] text-[#114654] rounded-2xl p-2 text-xs cursor-pointer"
        >
          Ask additional info
        </button>
        <Link href="/prescription">
          <button className="bg-[#114654] text-white rounded-2xl p-2 text-xs cursor-pointer">
            Make diagnosis report
          </button>
        </Link>
      </div>
      <Modal
        classname="w-[34vw] h-auto"
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Additional Information"       
      >
        <div className="-mt-6">
         <p className="text-xs text-[#3C3C4399] font-normal">
          Your request for additional information has been sent to the patient.
          You will be notified once they respond.
          </p>
          <div className="mt-7">
            <input
              className=" w-full bg-[#FFFFFF] border-[#E1E1E1] rounded-2xl border  p-2 text-sm outline-none"
              placeholder="Write your question here "
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
            />
            <div className="flex justify-end -mt-[35px]  mr-1">
               <button
              type="button"
              onClick={addMedication}
              className=" cursor-pointer  bg-[#114654] rounded-3xl text-white border-none  px-3 py-1.5 text-sm"
            >
             Add
            </button>
            </div>
            

           <div className="mt-5 mb-2">
              {meds.length > 0 &&
                meds.map((med, index) => (
                  <div
                    key={index}
                    className="border border-[#E2E2E2] rounded-lg text-sm text-[#000000CC]  px-3 py-1 mt-2 mr-2"
                  >
                    <div className="flex justify-between p-2">
                      <p>{`${index+1} . ${med.name}`}</p>
                       <button
                      onClick={() => removeMedication(index)}
                      className="ml-2 text-red-600 cursor-pointer hover:text-gray-700 focus:outline-none"
                    >
                      &times;
                    </button>
                    </div>                                       
                  </div>
                ))}
              
            </div>
            <button
              type="button"
              onClick={addMedication}
              className=" cursor-pointer w-full font-normal  bg-[#114654] rounded-3xl text-white border-none  px-3 py-1.5 text-sm"
            >
             Send to patient
            </button>
          </div>
          
        </div>
        
      </Modal>
    </div>
  );
};

export default AssessmentDetails;
