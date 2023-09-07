import { useState } from "react";
import { AnswerModel, AlternativeModel } from "../models/AnsweredQuizModel";

interface AnsweredQuizProps {
  answers: AnswerModel[];
}

export default function AnsweredQuiz(props: AnsweredQuizProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col">
      <button
        className="w-full p-2 bg-red-400 rounded-lg font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {
          isOpen ? <p>Esconder Respostas</p> : <p>Exibir Respostas</p> 
        }
      </button>
      {isOpen && (
        <div className="flex flex-col gap-3 p-2">
          {props.answers.map((answer: AnswerModel) => (
            <div className="flex flex-col gap-3 border-2 p-2 rounded-lg">
              <h1 className="text-md">{answer.question}</h1>

              <div className="flex flex-col gap-2 p-2">
                {answer.alternatives.map((alternative: AlternativeModel) => (
                  <div
                    className={`flex flex-col gap-2 ${
                      alternative.is_selected
                        ? alternative.guessed
                          ? "bg-green-700"
                          : "bg-red-700"
                        : ""
                    }`}
                  >
                    <h1 className="border-2">{alternative.choice}</h1>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
