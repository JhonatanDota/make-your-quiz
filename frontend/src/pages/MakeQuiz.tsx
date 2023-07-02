import { useState, useEffect } from "react";
import QuizQuestionModel from "../models/QuizQuestionModel";
import QuizQuestionAlternative from "../models/QuizQuestionAlternative";
import { BsFillTrash3Fill, BsFillPlusSquareFill } from "react-icons/bs";

interface MakeQuizProps {
  isMenuOpen: boolean;
}

export default function MakeQuiz(props: MakeQuizProps) {
  const LOCAL_STORAGE_ITEM_NAME = "creating-quiz-data";
  const localStorageData = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME);
  const initialQuizQuestions = localStorageData
    ? JSON.parse(localStorageData)
    : [];

  const [quizQuestions, setQuizQuestions] =
    useState<QuizQuestionModel[]>(initialQuizQuestions);

  function addQuizQuestion() {
    const newQuestion: QuizQuestionModel = {
      question: "new",
      alternatives: [],
    };

    setQuizQuestions([...quizQuestions, newQuestion]);
  }

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_ITEM_NAME,
      JSON.stringify(quizQuestions)
    );
  }, [quizQuestions]);

  function handleQuizQuestionTitleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    quizQuestionIndex: number
  ) {
    const newQuizQuestionTitle = event.target.value;
    updateQuizQuestion(quizQuestionIndex, {
      ...quizQuestions[quizQuestionIndex],
      question: newQuizQuestionTitle,
    });
  }

  function removeQuizQuestion(index: number) {
    const updatedQuestions = quizQuestions.filter((_, i) => i !== index);
    setQuizQuestions(updatedQuestions);
  }

  function updateQuizQuestion(
    index: number,
    updatedQuestion: QuizQuestionModel
  ) {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index] = updatedQuestion;
    setQuizQuestions(updatedQuestions);
  }

  function addQuizQuestionAlternative(quizQuestionIndex: number) {
    const updatedQuestions = [...quizQuestions];
    const quizQuestion = updatedQuestions[quizQuestionIndex];

    const newAlternative: QuizQuestionAlternative = {
      question: "New Alternative",
      isCorrect: false,
    };

    quizQuestion.alternatives.push(newAlternative);

    updateQuizQuestion(quizQuestionIndex, quizQuestion);
  }

  function handleAlternativeTextChange(
    event: React.ChangeEvent<HTMLInputElement>,
    quizQuestionIndex: number,
    quizQuestionAlternativeIndex: number
  ) {
    const newAlternativeText = event.target.value;

    const updatedQuestions = [...quizQuestions];
    const quizQuestion = updatedQuestions[quizQuestionIndex];
    quizQuestion.alternatives[quizQuestionAlternativeIndex].question =
      newAlternativeText;

    updateQuizQuestion(quizQuestionIndex, quizQuestion);
  }

  function handleAlternativeIsCorrectChange(
    quizQuestionIndex: number,
    quizQuestionAlternativeIndex: number
  ) {
    const updatedQuestions = [...quizQuestions];
    const quizQuestion = updatedQuestions[quizQuestionIndex];

    const quizQuestionAlternatives = quizQuestion.alternatives;

    for (let i: number = 0; i < quizQuestionAlternatives.length; i++) {
      quizQuestionAlternatives[i].isCorrect =
        i === quizQuestionAlternativeIndex;
    }

    updateQuizQuestion(quizQuestionIndex, quizQuestion);
  }

  function removeQuizQuestionAlternative(
    quizQuestionIndex: number,
    quizQuestionAlternativeIndex: number
  ) {
    const updatedQuestions = [...quizQuestions];
    const quizQuestion = updatedQuestions[quizQuestionIndex];

    const updatedAlternatives = quizQuestion.alternatives.filter(
      (_, i) => i !== quizQuestionAlternativeIndex
    );

    quizQuestion.alternatives = updatedAlternatives;

    updateQuizQuestion(quizQuestionIndex, quizQuestion);
  }

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8 text-white text-center">
      <p className="text-2xl md:text-6xl font-bold">Faça o seu quiz</p>
      <div className="flex flex-col gap-2 md:gap-6 md:w-1/2 md:m-auto">
        <label className="text-lg md:text-4xl font-bold ">Título</label>
        <input
          className="text-lg md:text-4xl p-2 md:p-6 bg-gray-950 border-4 md:border-8 rounded-md font-bold border-yellow-400"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-6 md:w-1/2 md:m-auto">
        <label className="text-lg md:text-4xl font-bold ">Descrição</label>
        <input
          className="text-lg md:text-4xl p-2 md:p-6 bg-gray-950 border-4 md:border-8 rounded-md font-bold border-yellow-400"
          type="text"
        />
      </div>

      <div className="flex flex-col gap-16 md:w-2/3 mt-6 md:m-auto md:mt-10">
        {quizQuestions.map((quizQuestion, quizQuestionIndex) => (
          <div
            className={`flex flex-col gap-6 md:gap-10 p-4 border-4 md:border-8 ${
              quizQuestionIndex % 2 == 0
                ? "border-yellow-400"
                : "border-blue-100"
            }`}
            key={quizQuestion.id}
          >
            <p className="text-lg mt-4 md:text-2xl uppercase font-bold">
              Questao: {quizQuestionIndex + 1}
            </p>

            <div className="flex flex-col gap-4 md:w-2/3 md:m-auto">
              <label className="text-lg md:text-2xl font-bold">Pergunta</label>
              <input
                className="text-lg md:text-2xl p-2 md:p-4 bg-gray-950 border-4 font-bold border-yellow-400"
                type="text"
                value={quizQuestion.question}
                onChange={(event) =>
                  handleQuizQuestionTitleChange(event, quizQuestionIndex)
                }
              />
            </div>
            <button
              className="flex items-center justify-center rounded-md text-md md:text-3xl md:w-1/8 md:m-auto p-2 md:p-8 font-bold bg-red-500"
              onClick={() => removeQuizQuestion(quizQuestionIndex)}
            >
              <BsFillTrash3Fill />
            </button>

            {quizQuestion.alternatives.map(
              (alternative, quizQuestionAlternativeIndex) => (
                <div className="flex flex-col gap-4" key={alternative.id}>
                  <div
                    className={`flex justify-around items-center ${
                      props.isMenuOpen ? "flex-col gap-y-3" : "flex-row"
                    }`}
                  >
                    <input
                      className="p-1 text-sm bg-gray-950 border-2 font-bold border-yellow-400"
                      type="text"
                      value={alternative.question}
                      onChange={(event) =>
                        handleAlternativeTextChange(
                          event,
                          quizQuestionIndex,
                          quizQuestionAlternativeIndex
                        )
                      }
                    />
                    <div className="flex gap-3">
                      <input
                        type="radio"
                        className="appearance-none w-4 h-4 rounded border-2 border-white checked:bg-green-500 checked:border-transparent"
                        checked={alternative.isCorrect}
                        onChange={() =>
                          handleAlternativeIsCorrectChange(
                            quizQuestionIndex,
                            quizQuestionAlternativeIndex
                          )
                        }
                      />
                      <button
                        className="flex justify-center text-red-400"
                        onClick={() =>
                          removeQuizQuestionAlternative(
                            quizQuestionIndex,
                            quizQuestionAlternativeIndex
                          )
                        }
                      >
                        <BsFillTrash3Fill />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
              <button
                className="w-1/2 m-auto flex items-center gap-2 rounded-md bg-green-400 font-bold p-2 text-slate-700"
                onClick={() => addQuizQuestionAlternative(quizQuestionIndex)}
              >
                <BsFillPlusSquareFill/>
                Alternativa
              </button>
          </div>
        ))}
      </div>

      <button className="p-3 font-bold bg-purple-600" onClick={addQuizQuestion}>
        Adicionar pergunta
      </button>
    </div>
  );
}
