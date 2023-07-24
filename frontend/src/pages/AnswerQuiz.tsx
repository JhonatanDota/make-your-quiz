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

  function handleChangeAnswer(
    quiz: QuizModel,
    questionIndex: number,
    alternativeIndex: number
  ) {
    const updatedQuestions = [...quiz.questions];
    const quizQuestion = updatedQuestions[questionIndex];

    const questionAlternatives = quizQuestion.alternatives;

    for (let i: number = 0; i < questionAlternatives.length; i++) {
      questionAlternatives[i].isSelected = i === alternativeIndex;
    }

    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    setQuiz(updatedQuiz);
  }

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8 text-white text-center">
      {quiz ? (
        <>
          <h1 className="text-4xl font-bold">{quiz.title}</h1>

          <form className="flex flex-col gap-4 p-3" action="">
            {quiz.questions.map(
              (question: QuizQuestionModel, questionIndex: number) => (
                <div
                  className="flex flex-col gap-y-4 p-4 border-4 rounded-md border-yellow-300"
                  key={question.id}
                >
                  <h2 className="text-2xl font-bold tracking-wider mb-4">
                    {question.question}
                  </h2>
                  {question.alternatives.map(
                    (
                      alternative: QuizQuestionAlternativeModel,
                      alternativeIndex: number
                    ) => (
                      <div
                        className={`flex mt-2 p-3 rounded-lg cursor-pointer border-4 hover:text-black hover:bg-green-500 bg hover:border-green-500 transition ease-in-out delay-100 ${
                          alternative.isSelected
                            ? "text-black bg-green-500 bg border-green-500"
                            : ""
                        }`}
                        key={alternative.id}
                        onClick={() =>
                          handleChangeAnswer(
                            quiz,
                            questionIndex,
                            alternativeIndex
                          )
                        }
                      >
                        <h1 className="text-lg font-bold max-w-full">
                          {alternative.choice}
                        </h1>
                      </div>
                    )
                  )}
                </div>
              )
            )}
          </form>
        </>
      ) : (
        <h1>Nao tem</h1>
      )}
    </div>
  );
}
