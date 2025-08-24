"use client";
import Header from "@/components/ui-reusable/Header";
import Modal from "@/components/ui-reusable/Modal";
import Link from "next/link";
import { useState } from "react";

const AssessmentDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                  className="border border-[#114654] text-[#114654] rounded-2xl p-2 text-xs">
          Ask additional info
        </button>
        <Link href="/prescription">
          <button className="bg-[#114654] text-white rounded-2xl p-2 text-xs cursor-pointer">
            Make diagnosis report
          </button>
        </Link>
      </div>
      <Modal
        classname="w-[30vw] h-auto"
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Add Account"
      ></Modal>
    </div>
  );
};

export default AssessmentDetails;
