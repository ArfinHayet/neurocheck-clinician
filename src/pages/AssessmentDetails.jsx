"use client";
import { getSubmissionByPatientId } from "@/api/assessment";
import Header from "@/components/ui-reusable/Header";
import SubmissionDetailsCard from "@/components/ui-reusable/SubmissionDetailsCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdditionalInfoModal from "./AdditionalInfoModal";
import { useParams } from "next/navigation";

const AssessmentDetails = () => {
  // const { patientId } = useParams();

  const params = useParams();
  const patientId = params?.patientId ?? null;

  if (!patientId) {
    return <div>Loading...</div>; // or handle gracefully
  }
  
  const [submission, setSubmission] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getSubmissionDetails = async () => {
    const result = await getSubmissionByPatientId(patientId);
    console.log(result?.payload);
    setSubmission(result?.payload);
  };

  useEffect(() => {
    getSubmissionDetails();
  }, [patientId]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="p-6 lg:p-0">
      <Header
        title="Assessment"
        description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
      />
      {submission?.map((item, index) => (
        <SubmissionDetailsCard
          key={index}
          patientId={item?.id}
          name={item?.patient?.name}
          age={item?.patient?.dateOfBirth}
          timeAgo={item?.createdAt}
          status={item?.status}
          ratings={item?.ratings}
          childCondition={item?.assessment?.category}
          description={item?.summary}
          onViewFullAssessment={() => handleView(item)}
          onRateSummary={() => handleViewRate(item?.id)}
          onAcceptCase={() => handleAccept(item?.id)}
        />
      ))}
      <div className="p-5 flex flex-row justify-end gap-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="border border-[#114654] text-[#114654] rounded-2xl p-2 text-xs cursor-pointer"
        >
          Ask additional info
        </button>
        {/* <Link href="/prescription"> */}
        <Link href={`/prescription/${patientId}`}>
          <button className="bg-[#114654] text-white rounded-2xl p-2 text-xs cursor-pointer">
            Make diagnosis report
          </button>
        </Link>
      </div>
       {submission?.map((item, index) => (
         <AdditionalInfoModal
          key={index}
        additionalInfo={item?.additionalInfo}
        patientId={patientId}
        isModalOpen={isModalOpen} closeModal={closeModal} /> ))}
    </div>
  );
};

export default AssessmentDetails;
