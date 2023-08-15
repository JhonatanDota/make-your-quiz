import { useState, useEffect } from "react";
import { QuizModel } from "../models/QuizModel";
import { useParams } from "react-router-dom";
import { getQuiz } from "../requests/quiz";
import QuizQuestionModel from "../models/QuizQuestionModel";
import QuizQuestionAlternativeModel from "../models/QuizQuestionAlternativeModel";
import { Toaster, toast } from "react-hot-toast";
import AnswerQuizModel from "../models/AnswerQuizModel";

export default function AnswerQuiz() {
  const { id } = useParams();

  const [quizAnswered, setQuizAnswered] = useState<QuizModel>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchQuiz(id: number) {
    try {
      const quiz = await getQuiz(id);

      setQuizAnswered(quiz.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) fetchQuiz(parseInt(id));
  }, [id]);

  async function handleAnswerQuiz(answerQuizData: AnswerQuizModel) {
    console.log(answerQuizData);
  }

  function handleChangeAnswer(
    quizAnswered: QuizModel,
    questionIndex: number,
    alternativeIndex: number
  ) {
    const updatedQuestions = [...quizAnswered.questions];
    const quizQuestion = updatedQuestions[questionIndex];

    const questionAlternatives = quizQuestion.alternatives;

    for (let i: number = 0; i < questionAlternatives.length; i++) {
      questionAlternatives[i].isSelected = i === alternativeIndex;
    }

    const updatedQuiz = { ...quizAnswered, questions: updatedQuestions };
    setQuizAnswered(updatedQuiz);
  }

  function getQuestionsAlternatives(
    quizQuestions: QuizQuestionModel[]
  ): QuizQuestionAlternativeModel[][] {
    let alternatives = quizQuestions.map(
      (question: QuizQuestionModel) => question.alternatives
    );

    return alternatives;
  }

  function checkQuizQuestionsSelectedAlternatives(
    quizQuestionsAlternavies: QuizQuestionAlternativeModel[][]
  ): boolean {
    for (
      let alternativesListsIndex: number = 0;
      alternativesListsIndex < quizQuestionsAlternavies.length;
      alternativesListsIndex++
    ) {
      let alternativesList: QuizQuestionAlternativeModel[] =
        quizQuestionsAlternavies[alternativesListsIndex];
      let haveSelectedAlternative: boolean = false;

      for (
        let alternativesListIndex: number = 0;
        alternativesListIndex < alternativesList.length;
        alternativesListIndex++
      ) {
        let alternative: QuizQuestionAlternativeModel =
          alternativesList[alternativesListIndex];
        let isSelected: boolean | undefined = alternative.isSelected;

        if (isSelected === true) {
          haveSelectedAlternative = true;
          break;
        }
      }

      if (haveSelectedAlternative === false) {
        toast.error(`Questão ${alternativesListsIndex + 1} não respondida.`);
        return haveSelectedAlternative;
      }
    }

    return true;
  }

  function answerQuiz(
    event: React.FormEvent<HTMLFormElement>,
    quizAnswered: QuizModel
  ) {
    event.preventDefault();

    const quizQuestions: QuizQuestionModel[] = quizAnswered.questions;
    const extractedQuizAlternatives: QuizQuestionAlternativeModel[][] =
      getQuestionsAlternatives(quizQuestions);

    if (
      checkQuizQuestionsSelectedAlternatives(extractedQuizAlternatives) ===
      false
    )
      return;

    handleAnswerQuiz({
      quiz_id: quizAnswered.id,
      alternatives: extractedQuizAlternatives,
    });

    return;
  }

  return (
    <div className="flex flex-col md:w-1/2 md:m-auto gap-y-4 md:gap-y-8 text-slate-200 text-center">
      {isLoading ? (
        <div></div>
      ) : quizAnswered ? (
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{quizAnswered.title}</h1>

          <form
            className="flex flex-col gap-4 md:gap-12 p-3 md:p-6"
            onSubmit={(event) => answerQuiz(event, quizAnswered)}
          >
            {quizAnswered.questions.map(
              (question: QuizQuestionModel, questionIndex: number) => (
                <div
                  className="flex flex-col gap-y-4 p-4 md:p-8 border-4 md:border-[15px] rounded-md border-yellow-300"
                  key={question.id}
                >
                  <h2 className="text-2xl md:text-4xl font-bold tracking-wider mb-4">
                    {question.question}
                  </h2>
                  {question.alternatives.map(
                    (
                      alternative: QuizQuestionAlternativeModel,
                      alternativeIndex: number
                    ) => (
                      <div
                        className={`flex mt-2 p-3 rounded-lg cursor-pointer border-4 md:border-[6px] hover:text-black hover:bg-green-500 bg hover:border-green-500 ${
                          alternative.isSelected
                            ? "text-black bg-green-500 bg border-green-500"
                            : ""
                        }`}
                        key={alternative.id}
                        onClick={() =>
                          handleChangeAnswer(
                            quizAnswered,
                            questionIndex,
                            alternativeIndex
                          )
                        }
                      >
                        <h1 className="text-lg md:text-3xl font-bold max-w-full">
                          {alternative.choice}
                        </h1>
                      </div>
                    )
                  )}
                </div>
              )
            )}
            <button
              type="submit"
              className="mt-4 rounded-md p-4 md:p-6 text-md md:text-2xl font-bold bg-green-500"
            >
              Concluir Quiz
            </button>
          </form>
        </div>
      ) : (
        <h1>Nao tem</h1>
      )}
      <Toaster position="top-right" />
    </div>
  );
}
