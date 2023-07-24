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
          <h1 className="text-3xl font-bold">{quiz.title}</h1>
          <h2 className="text-lg font-bold">{quiz.description}</h2>

          <form className="flex flex-col gap-4 p-3" action="">
            {quiz.questions.map(
              (question: QuizQuestionModel, questionIndex: number) => (
                <div
                  className="flex flex-col px-4 py-4 border-4 border-yellow-300"
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
                        className={`flex justify-between mt-2 p-3 rounded-lg cursor-pointer border-4 ${alternative.isSelected ? "border-green-400" : ""}`}
                        key={alternative.id}
                        onClick={() =>
                          handleChangeAnswer(
                            quiz,
                            questionIndex,
                            alternativeIndex
                          )
                        }
                      >
                        <h1 className="text-lg font-bold">
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
