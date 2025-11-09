"use client";

import Header from "@/components/ui-reusable/Header";
import AssessmentCard from "@/components/ui-reusable/AssesmentCard";
import { useContext, useEffect, useState } from "react";
import RatingModal from "./RatingModal";
import SubmissionDetails from "./SubmissionDetails";
import { getAllsubmissions, updateStatus } from "@/api/assessment";
import { AuthContext } from "../Provider/AuthProvider";
// import { AuthContext } from "../Provider/AuthProvider";

const Assessment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [submission, setSubmission] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
   const { userData } = useContext(AuthContext) || {};

const handleSubmitRating = () => {
  setIsRateModalOpen(false);
};

  const handleView = (item) => {
    console.log("33",item)
    setSelectedSubmission(item);
    setIsModalOpen(true);
  };

  const handleViewRate = (id) => {
     setSelectedId(id);
    setIsRateModalOpen(true);
  };

  const handleAccept = async (id) => {
    // console.log(id)
    const obj = {
      status: "completed",
      clinicianId: userData?.id
      
    }
    const result = await updateStatus(id,obj)
    alert("Accepted")
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const fetchSubmissions = async () => {
    const data = await getAllsubmissions();
    const rawData = data.payload?.filter((i) => i?.assessment?.type === "premium");
    // const rawData = data.payload;
    // console.log(rawData)
    setSubmission(rawData);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);


  return (
    <div className="p-6 lg:p-0 min-h-screen mb-2">
      <Header
        title="Assessment queue"
        description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
      />

      <div className="flex flex-col gap-5">
  {submission?.length > 0 ? (
    submission.map((item, index) => (
      <AssessmentCard
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
    ))
  ) : (
    <p className="text-center text-gray-500 italic">
      There is no submission yet.
    </p>
  )}
</div>


      {selectedSubmission && (
        <SubmissionDetails
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          patientId={selectedSubmission?.patientId}
          time = {selectedSubmission?.createdAt}
          score ={selectedSubmission?.score}
          assessmentId={selectedSubmission?.assessmentId}

        />
      )}

      <RatingModal
      isOpen={isRateModalOpen}
      onClose={() => setIsRateModalOpen(false)}
      onSubmit={handleSubmitRating}
      maxStars={5}
      selectedId={selectedId}
      initialRating={0}
    />
    </div>
  );
};

export default Assessment;
