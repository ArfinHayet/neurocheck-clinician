"use client";

import Header from "@/components/ui-reusable/Header";
import AssessmentCard from "@/components/ui-reusable/AssesmentCard";
import { useState } from "react";
import Modal from "@/components/ui-reusable/Modal";
import p1 from "../../public/svg/user-img.svg";
import Image from "next/image";
import TextAns from "@/components/ui-reusable/TextAns";
import RatingModal from "./RatingModal";

const Assessment = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);


  const handleView = () => {
    setIsModalOpen(true);
  };

  const handleViewRate = () => {
    setIsRateModalOpen(true);
  };

  const handleAccept = () => alert("Accept case clicked");

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeRateModal = () => {
    setIsRateModalOpen(false);
  };
  return (
    <div>
      <Header
        title="Assessment queue"
        description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
        // onMessageClick={handleMessageClick}
        // onNotificationClick={handleNotificationClick}
      />
      <div className="">
        <AssessmentCard
          name="Oliver Bennett"
          age={15}
          timeAgo="3h 43min ago"
          status="Accepted"
          childCondition="Child ADHD"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          onViewFullAssessment={handleView}
          onRateSummary={handleViewRate}
          onAcceptCase={handleAccept}
        />
      </div>

      <Modal
        classname="w-[30vw] h-auto"
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Assessment details"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <Image
              src={p1}
              alt="User"
              height={40}
              width={40}
              className="w-10 h-10 rounded-full"
              priority
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Oliver Bennett</h2>
                <span className="px-2 py-0.5 md:block hidden rounded-md text-xs">
                  pending
                </span>
              </div>
              <p className="text-xs text-gray-500">2 years • 3h 43min ago</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[60vh] pr-2">
          <TextAns
            text="I enjoy social gatherings"
            answer="Strongly disagree"
            score={0}
          />
          <TextAns
            text="I enjoy social gatherings"
            answer="Strongly disagree"
            score={0}
          />
          <TextAns
            text="I enjoy social gatherings"
            answer="Strongly disagree"
            score={0}
          />
        </div>
      </Modal>

       <RatingModal
        isOpen={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        onSubmit={(data) => {
          console.log("feedback:", data);
          setIsRateModalOpen(false);
        }}
        maxStars={5}
        initialRating={0}
      />
     
    </div>
  );
};

export default Assessment;
