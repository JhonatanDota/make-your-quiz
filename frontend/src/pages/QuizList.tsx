import { useEffect, useState } from "react";
import QuizPreviewCard from "../components/QuizPreviewCard";
import QuizModel from "../models/QuizModel";
import { getAllQuizes } from "../requests/quiz";

export default function QuizList() {
  const [quizList, setQuizList] = useState<QuizModel[]>([]);
  const [loadingQuizList, setLoadingQuizList] = useState<boolean>(true);

  async function fetchQuizes() {
    try {
      const quizesResponse = await getAllQuizes();

      setQuizList(quizesResponse.data.data);
    } catch {}

    setLoadingQuizList(false);
  }

  useEffect(() => {
    fetchQuizes();
  }, []);

  return (
    <div className="flex flex-col p-6 gap-y-6">
      {quizList.length || loadingQuizList ? (
        quizList.map((quiz: QuizModel) => <QuizPreviewCard quiz={quiz} />)
      ) : (
        <div className="mt-[50%]">
          <h1 className="text-3xl leading-10 text-white text-center font-bold">
            Não existe nenhum Quiz no momento 😢
          </h1>
        </div>
      )}
    </div>
  );
}
