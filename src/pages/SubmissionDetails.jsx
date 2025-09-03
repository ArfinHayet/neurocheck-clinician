// import Modal from "@/components/ui-reusable/Modal";
// import TextAns from "@/components/ui-reusable/TextAns";
// import p1 from "../../public/svg/user-img.svg";
// import { useEffect, useState } from "react";
// import { getAllanswers } from "@/api/assessment";

// const SubmissionDetails = ({ isModalOpen, closeModal }) => {
//   const [answer, setAnswer] = useState([]);

//   const fetchAnswers = async () => {
//     const data = await getAllanswers();
//     console.log(data);
//     const rawData = data.payload;

//     const grouped = rawData.reduce((acc, curr) => {
//       const userId = curr.userId;

//       if (!acc[userId]) {
//         acc[userId] = {
//           user: curr.user,
//           patient: curr.patient,
//           assessment: curr.assessment,
//           answers: [],
//         };
//       }

//       acc[userId].answers.push({
//         questionId: curr.questionId,
//         question: curr.question.questions,
//         answerType: curr.question.answerType,
//         options: curr.question.options,
//         answer: curr.answer,
//       });

//       return acc;
//     }, {});

//     // Convert object to array
//     const result = Object.values(grouped);

//     console.log(result);

//     setAnswer(result);
//   };

//   useEffect(() => {
//     fetchAnswers();
//   }, []);

//   return (
//     <div>
//       <Modal
//         classname="w-[30vw] h-auto"
//         isOpen={isModalOpen}
//         closeModal={closeModal}
//         title="Assessment details"
//       >
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex gap-4">
//             <Image
//               src={p1}
//               alt="User"
//               height={40}
//               width={40}
//               className="w-10 h-10 rounded-full"
//               priority
//             />
//             <div>
//               <div className="flex items-center gap-2">
//                 <h2 className="font-semibold">Oliver Bennett</h2>
//                 <span className="px-2 py-0.5 md:block hidden rounded-md text-xs">
//                   pending
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500">2 years • 3h 43min ago</p>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[60vh] pr-2">
//           <TextAns
//             text="I enjoy social gatherings"
//             answer="Strongly disagree"
//             score={0}
//           />
//           <TextAns
//             text="I enjoy social gatherings"
//             answer="Strongly disagree"
//             score={0}
//           />
//           <TextAns
//             text="I enjoy social gatherings"
//             answer="Strongly disagree"
//             score={0}
//           />
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default SubmissionDetails;


import Modal from "@/components/ui-reusable/Modal";
import TextAns from "@/components/ui-reusable/TextAns";
import Image from "next/image";
import p1 from "../../public/svg/user-img.svg";
import { useEffect, useState } from "react";
import { getAllanswers } from "@/api/assessment";

const SubmissionDetails = ({ isModalOpen, closeModal }) => {
  const [answer, setAnswer] = useState([]);

  const fetchAnswers = async () => {
    try {
      const data = await getAllanswers();
      const rawData = data.payload;

      const grouped = rawData.reduce((acc, curr) => {
        const userId = curr.userId;

        if (!acc[userId]) {
          acc[userId] = {
            user: curr.user,
            patient: curr.patient,
            assessment: curr.assessment,
            answers: [],
          };
        }

        acc[userId].answers.push({
          questionId: curr.questionId,
          question: curr.question.questions,
          answerType: curr.question.answerType,
          options: curr.question.options,
          answer: curr.answer,
        });

        return acc;
      }, {});

      // Convert object to array
      const result = Object.values(grouped);

      setAnswer(result);
    } catch (err) {
      console.error("Error fetching answers:", err);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  return (
    <div>
      <Modal
        classname="w-[30vw] h-auto"
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Assessment details"
      >
        {answer.map((submission, idx) => (
          <div key={idx} className="mb-6">
            {/* User Info */}
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
                    <h2 className="font-semibold">{submission.user.name}</h2>
                    <span className="px-2 py-0.5 md:block hidden rounded-md text-xs bg-gray-100">
                      {submission.assessment?.name || "N/A"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Patient: {submission.patient?.name} (
                    {submission.patient?.relationshipToUser})
                  </p>
                </div>
              </div>
            </div>

            {/* Answers */}
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[60vh] pr-2">
              {submission.answers.map((ans, i) => (
                <TextAns
                  key={i}
                  text={ans.question}
                  answer={ans.answer}
                  score={null} 
                />
              ))}
            </div>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default SubmissionDetails;
