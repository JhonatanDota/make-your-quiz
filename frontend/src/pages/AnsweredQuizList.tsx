import { useState, useEffect } from "react";
import { AnsweredQuizModel } from "../models/AnsweredQuizModel";
import { getMyAnsweredQuizes } from "../requests/quiz";
import AnsweredQuiz from "../components/AnsweredQuiz";

export default function AnsweredQuizList() {
  const [answeredQuizes, setAnsweredQuizes] = useState<AnsweredQuizModel[]>([]);

  async function fetchMyAnweredQuizes() {
    try {
      const myAnsweredQuizesResponse = await getMyAnsweredQuizes();
      setAnsweredQuizes(myAnsweredQuizesResponse.data);
    } catch {}
  }

  useEffect(() => {
    fetchMyAnweredQuizes();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8 text-center">
      <h1 className="text-3xl font-bold text-white">Respondidos</h1>

      <div className="flex flex-col gap-8">
        {answeredQuizes.map((answeredQuiz: AnsweredQuizModel) => (
          <div className="flex flex-col gap-3 items-center text-white p-4 border-2 rounded-lg">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold tracking-wider text-yellow-400">{answeredQuiz.quiz.title}</h1>

              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Questões</h2>

                <div className="flex justify-between">
                  <div className="flex flex-col text-lg font-bold border-2 p-4 w-1/2">
                    <h3>Total</h3>
                    <h3>{answeredQuiz.question_count}</h3>
                  </div>
                  <div className="flex flex-col text-lg font-bold border-2 p-4 w-1/2">
                    <h3>Corretas</h3>
                    <h3>{answeredQuiz.correct_count}</h3>
                  </div>
                </div>
              </div>
            </div>
            <AnsweredQuiz answers={answeredQuiz.answers} />
          </div>
        ))}
      </div>
    </div>
  );
}
