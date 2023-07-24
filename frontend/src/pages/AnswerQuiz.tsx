import { useState, useEffect } from "react";
import { QuizModel } from "../models/QuizModel";
import { useParams } from "react-router-dom";
import { getQuiz } from "../requests/quiz";
import QuizQuestionModel from "../models/QuizQuestionModel";
import QuizQuestionAlternativeModel from "../models/QuizQuestionAlternativeModel";

export default function AnswerQuiz() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState<QuizModel>();

  async function fetchQuiz(id: number) {
    try {
      const quiz = await getQuiz(id);

      setQuiz(quiz.data);
    } catch (error) {}
  }

  useEffect(() => {
    if (id) fetchQuiz(parseInt(id));
  }, [id]);

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8 text-white text-center">
      {quiz ? (
        <>
          <h1>{quiz.title}</h1>
          <h1>{quiz.description}</h1>

          <form action="">
            {
              quiz.questions.map((question: QuizQuestionModel) => (
                question.alternatives.map((alternative: QuizQuestionAlternativeModel) => (
                  <h1>asd</h1>
                ))
              ))
            }
          </form>
        </>
      ): <h1>Nao tem</h1>}
    </div>
  );
}
