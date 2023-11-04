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

  function correctPercent(totalCount: number, correctCount: number): string {
    const percent = (correctCount / totalCount) * 100;
    const percentFixed = percent.toFixed(2);

    return `${percentFixed} %`;
  }

  return (
    <div className="flex flex-col gap-y-8 text-center">
      <h1 className="text-3xl md:text-6xl font-bold text-white">Respondidos</h1>

      <div className="flex flex-col gap-8 md:w-1/3 md:m-auto">
        {answeredQuizes.map((answeredQuiz: AnsweredQuizModel) => (
          <div className="flex flex-col gap-3 md:gap-8 items-center text-white p-4 md:p-8 border-2 md:border-[15px] rounded-lg">
            <div className="flex flex-col gap-4 md:gap-8 w-full">
              <h1 className="text-2xl md:text-4xl font-bold tracking-wider text-yellow-400">
                {answeredQuiz.quiz.title}
              </h1>

              <div className="flex flex-col gap-1 md:gap-4 w-4/5 m-auto">
                <div className="flex justify-between">
                  <div className="flex flex-col text-lg md:text-3xl font-bold">
                    <h3>Total</h3>
                    <h3>{answeredQuiz.question_count}</h3>
                  </div>
                  <div className="flex flex-col text-lg md:text-3xl font-bold">
                    <h3>Corretas</h3>
                    <h3>{answeredQuiz.correct_count}</h3>
                  </div>
                </div>
                <h3 className="text-lg md:text-3xl font-bold">
                  {correctPercent(
                    answeredQuiz.question_count,
                    answeredQuiz.correct_count
                  )}
                </h3>
              </div>
            </div>
            <AnsweredQuiz answers={answeredQuiz.answers} />
          </div>
        ))}
      </div>
    </div>
  );
}
