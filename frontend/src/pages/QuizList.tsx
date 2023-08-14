import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import QuizPreviewCard from "../components/QuizPreviewCard";
import { QuizModel } from "../models/QuizModel";
import { getAllQuizes } from "../requests/quiz";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

export default function QuizList() {
  const [quizList, setQuizList] = useState<QuizModel[]>([]);
  const [loadingQuizList, setLoadingQuizList] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<string>("");
  const [previousPage, setPreviousPage] = useState<string>("");

  async function fetchQuizes(page?: string) {
    try {
      const quizesResponse = await getAllQuizes(page);
      const quizesResponseData = quizesResponse.data;

      setNextPage(quizesResponseData.next_page_url);
      setPreviousPage(quizesResponseData.prev_page_url);
      setQuizList(quizesResponseData.data);
    } catch {}

    setLoadingQuizList(false);
  }

  useEffect(() => {
    fetchQuizes();
  }, []);

  return (
    <div className="flex flex-col p-4 gap-y-6 md:gap-y-12 md:w-2/3 lg:w-1/2 md:m-auto">
      {quizList.length || loadingQuizList ? (
        <>
          {quizList.map((quiz: QuizModel) => (
            <NavLink to={`/answer-quiz/${quiz.id}/`}>
              <QuizPreviewCard quiz={quiz} />
            </NavLink>
          ))}
          <div className="flex justify-between w-11/12 m-auto mt-5">
            {previousPage && (
              <button
                className="flex items-center"
                onClick={() => fetchQuizes(previousPage)}
              >
                <BsFillArrowLeftSquareFill className="text-white text-2xl md:text-4xl" />
                <span className="text-lg md:text-3xl text-slate-200 font-bold ml-2">
                  Anterior
                </span>
              </button>
            )}
            {nextPage && (
              <button
                className="flex items-center"
                onClick={() => fetchQuizes(nextPage)}
              >
                <span className="text-lg md:text-3xl text-slate-200 font-bold mr-2">
                  Próximo
                </span>
                <BsFillArrowRightSquareFill className="text-white text-2xl md:text-4xl" />
              </button>
            )}
          </div>
        </>
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
