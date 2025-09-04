// "use client";

// import Header from "@/components/ui-reusable/Header";
// import AssessmentCard from "@/components/ui-reusable/AssesmentCard";
// import { useEffect, useState } from "react";
// import RatingModal from "./RatingModal";
// import SubmissionDetails from "./SubmissionDetails";
// import { getAllanswers, getAllsubmissions } from "@/api/assessment";

// const Assessment = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isRateModalOpen, setIsRateModalOpen] = useState(false);

//   const handleView = () => {
//     setIsModalOpen(true);
//   };

//   const handleViewRate = () => {
//     setIsRateModalOpen(true);
//   };

//   const handleAccept = () => alert("Accept case clicked");

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   const closeRateModal = () => {
//     setIsRateModalOpen(false);
//   };

//   const [submission, setSubmission] = useState([]);

//   const fetchSubmissions = async () => {
//     const data = await getAllsubmissions();
//     const rawData = data.payload?.filter(i=>i.assessment?.type === "premium");
//     console.log("uu", rawData);

//     // const grouped = rawData.reduce((acc, curr) => {
//     //   const userId = curr.userId;

//     //   if (!acc[userId]) {
//     //     acc[userId] = {
//     //       user: curr.user,
//     //       patient: curr.patient,
//     //       assessment: curr.assessment,
//     //       answers: [],
//     //     };
//     //   }

//     //   acc[userId].answers.push({
//     //     questionId: curr.questionId,
//     //     question: curr.question.questions,
//     //     answerType: curr.question.answerType,
//     //     options: curr.question.options,
//     //     answer: curr.answer,
//     //   });

//     //   return acc;
//     // }, {});

//     // // Convert object to array
//     // const result = Object.values(grouped);

//     setSubmission(rawData);
//   };

//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   return (
//     <div>
//       <Header
//         title="Assessment queue"
//         description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
//         // onMessageClick={handleMessageClick}
//         // onNotificationClick={handleNotificationClick}
//       />
//       <div className="flex flex-col gap-5">
//         {submission?.map((item, index) => (
//           <AssessmentCard
//             key={index}
//             name={item?.patient?.name}
//             age={item?.patient?.dateOfBirth}
//             timeAgo={item?.createdAt}
//             status="Accepted"
//             childCondition={item?.assessment?.category}
//             description={item?.summary}
//             onViewFullAssessment={handleView}
//             onRateSummary={handleViewRate}
//             onAcceptCase={handleAccept}
//           />
//         ))}
//       </div>
//         {submission?.map((item) => (
//           <SubmissionDetails
//             isModalOpen={isModalOpen}
//             closeModal={closeModal}
//             assessmentId={item?.assessmentId}
//           />))}

//       <RatingModal
//         isOpen={isRateModalOpen}
//         onClose={() => setIsRateModalOpen(false)}
//         onSubmit={(data) => {
//           console.log("feedback:", data);
//           setIsRateModalOpen(false);
//         }}
//         maxStars={5}
//         initialRating={0}
//       />
//     </div>
//   );
// };

// export default Assessment;


"use client";

import Header from "@/components/ui-reusable/Header";
import AssessmentCard from "@/components/ui-reusable/AssesmentCard";
import { useEffect, useState } from "react";
import RatingModal from "./RatingModal";
import SubmissionDetails from "./SubmissionDetails";
import { getAllanswers, getAllsubmissions } from "@/api/assessment";

const Assessment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [submission, setSubmission] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const handleView = (item) => {
    setSelectedSubmission(item);
    setIsModalOpen(true);
  };

  const handleViewRate = () => {
    setIsRateModalOpen(true);
  };

  const handleAccept = () => alert("Accept case clicked");

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const fetchSubmissions = async () => {
    const data = await getAllsubmissions();
    const rawData = data.payload?.filter((i) => i.assessment?.type === "premium");
    console.log(rawData)
    setSubmission(rawData);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);


  return (
    <div>
      <Header
        title="Assessment queue"
        description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
      />

      <div className="flex flex-col gap-5">
        {submission?.map((item, index) => (
          <AssessmentCard
            key={index}
            name={item?.patient?.name}
            age={item?.patient?.dateOfBirth}
            timeAgo={item?.createdAt}
            status="Accepted"
            childCondition={item?.assessment?.category}
            description={item?.summary}
            onViewFullAssessment={() => handleView(item)}
            onRateSummary={handleViewRate}
            onAcceptCase={handleAccept}
          />
        ))}
      </div>

      {selectedSubmission && (
        <SubmissionDetails
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          id={selectedSubmission?.patientId}
          time = {selectedSubmission?.createdAt}
          score ={selectedSubmission?.score}
          assessmentId={selectedSubmission?.assessmentId}

        />
      )}

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
