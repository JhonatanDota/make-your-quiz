import { useState } from "react";
import { AnswerModel, AlternativeModel } from "../models/AnsweredQuizModel";

interface AnsweredQuizProps {
  answers: AnswerModel[];
}

export default function AnsweredQuiz(props: AnsweredQuizProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col gap-3">
      <button
        className={`w-full text-slate-900 p-2 rounded-lg font-bold ${
          isOpen ? "bg-yellow-400" : "bg-green-500"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <p>Ocultar Respostas</p> : <p>Exibir Respostas</p>}
      </button>
      <div
        className={`flex flex-col gap-3 overflow-hidden transition-max-h ease-in duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {props.answers.map((answer: AnswerModel) => (
          <div className="flex flex-col gap-3 border-2 p-2 rounded-lg font-bold">
            <h1 className="text-lg">{answer.question}</h1>

            <div className="flex flex-col gap-2 p-2">
              {answer.alternatives.map((alternative: AlternativeModel) => (
                <div
                  className={`flex flex-col gap-2 rounded-md ${
                    alternative.is_selected
                      ? alternative.guessed
                        ? "bg-green-700"
                        : "bg-red-700"
                      : ""
                  }`}
                >
                  <h1 className="text-md">{alternative.choice}</h1>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
