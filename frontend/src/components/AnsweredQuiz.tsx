import { useState } from "react";
import { AnswerModel, AlternativeModel } from "../models/AnsweredQuizModel";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";

interface AnsweredQuizProps {
  answers: AnswerModel[];
}

export default function AnsweredQuiz(props: AnsweredQuizProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col gap-3 md:gap-6">
      <button
        className="m-auto text-4xl md:text-6xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <BsArrowUpCircleFill className="text-red-600" />
        ) : (
          <BsArrowDownCircleFill className="text-green-600" />
        )}
      </button>
      <div className={`gap-3 md:gap-8 ${isOpen ? "flex flex-col " : "hidden"}`}>
        {props.answers.map((answer: AnswerModel) => (
          <div className="flex flex-col gap-3 border-2 md:border-4 p-2 md:p-6 rounded-lg font-bold">
            <h1 className="text-lg md:text-3xl">{answer.question}</h1>

            <div className="flex flex-col gap-2 md:gap-6 p-2 md:p-6">
              {answer.alternatives.map((alternative: AlternativeModel) => (
                <div
                  className={`flex flex-col p-1 md:p-4 rounded-md ${
                    alternative.is_selected
                      ? alternative.guessed
                        ? "bg-green-600"
                        : "bg-red-600"
                      : ""
                  }`}
                >
                  <h1 className="text-md md:text-xl">{alternative.choice}</h1>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
