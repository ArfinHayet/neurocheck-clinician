import Modal from "@/components/ui-reusable/Modal";
import TextAns from "@/components/ui-reusable/TextAns";
import p1 from "../../public/svg/user-img.svg";
import { useEffect, useState } from "react";
import { getAllanswers } from "@/api/assessment";
import { getAge } from "@/components/utils/ageConverter";
import Image from "next/image";
import { timeConverter } from "@/components/utils/timeconverter";

const SubmissionDetails = ({ isModalOpen, closeModal, assessmentId, id, score, time }) => {
  const [answer, setAnswer] = useState([]);

  const fetchAnswers = async () => {
    try {
      const data = await getAllanswers(assessmentId);
      const rawData = data.payload;
      console.log(rawData)
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
      const result = Object.values(grouped);
      const submission = result?.filter(i => i.patient?.id === id)
      setAnswer(submission);
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
          <div key={idx}>
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
            <div key={idx}>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{submission?.patient?.name}</h2>
                <span className="px-2 py-0.5 md:block hidden rounded-md text-xs">
                 Score : {score}
                </span>
              </div>
              {/* <p className="text-xs text-gray-500">2 years • 3h 43min ago</p> */}
                  <p className="text-xs text-gray-500">{getAge(submission?.patient?.dateOfBirth)} years • {timeConverter(time)}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[60vh] pr-2">
              {submission?.answers?.map((ans, i) => (
                <TextAns
                   key={i}
                  text={ans.question}
                  answer={ans.answer}
                  score={0}
                />))}
       
        </div></div>  ))}
      </Modal>
    </div>
  );
};

export default SubmissionDetails;

