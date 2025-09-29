import Modal from "@/components/ui-reusable/Modal";
import TextAns from "@/components/ui-reusable/TextAns";
import p1 from "../../public/svg/user-img.svg";
import { useEffect, useState } from "react";
import { getAllanswers } from "@/api/assessment";
import { getAge } from "@/components/utils/ageConverter";
import Image from "next/image";
import { timeConverter } from "@/components/utils/timeconverter";

const SubmissionDetails = ({
  isModalOpen,
  closeModal,
  patientId,
  score,
  time,
}) => {
  const [answers, setAnswers] = useState([]);
  const [patient, setPatient] = useState(null);

  const fetchAnswers = async () => {
    const data = await getAllanswers({ patientId });
    const rawData = data?.payload || [];

    if (rawData.length > 0) {
      // patient info ekbar nibo
      setPatient(rawData[0].patient);

      // shudhu question + answer nibo
      const formatted = rawData.map((item) => ({
        id: item.id,
        questionId: item.question.id,
        question: item.question.questions,
        answer: item.answer,
      }));
      setAnswers(formatted);
    }
  };

  useEffect(() => {
    if (isModalOpen && patientId) {
      fetchAnswers();
    }
  }, [isModalOpen, patientId]);

  return (
    <div>
      <Modal
        classname="w-[30vw] h-auto"
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Assessment details"
      >
        {patient && (
          <div>
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
                    <h2 className="font-semibold">{patient?.name}</h2>
                    <span className="px-2 py-0.5 md:block hidden rounded-md text-xs">
                      Score : {score || 0}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {getAge(patient?.dateOfBirth)} years • {timeConverter(time)}
                  </p>
                </div>
              </div>
            </div>

            {/* Answers List */}
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[60vh] pr-2">
              {answers.map((ans) => (
                <TextAns
                  key={ans.id}
                  text={ans.question}
                  answer={ans.answer}
                  score={0}
                />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SubmissionDetails;
