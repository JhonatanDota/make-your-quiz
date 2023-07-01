import { useState, useEffect } from "react";
import QuizQuestionModel from "../models/QuizQuestionModel";
import QuizQuestionAlternative from "../models/QuizQuestionAlternative";

export default function MakeQuiz() {
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
    <div className="flex flex-col gap-6 text-white text-center">
      <p className="text-2xl font-bold">Faça o seu quiz</p>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-bold ">Título</label>
        <input
          className="p-2 bg-gray-950 border-4 font-bold border-yellow-400"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-bold ">Descrição</label>
        <input
          className="p-2 bg-gray-950 border-4 font-bold border-yellow-400"
          type="text"
        />
      </div>

      <div className="flex flex-col gap-5">
        {quizQuestions.map((quizQuestion, quizQuestionIndex) => (
          <div className="flex flex-col p-2 border-2 border-yellow-400" key={quizQuestion.id}>
            <button onClick={() => removeQuizQuestion(quizQuestionIndex)}>
              Remover
            </button>
            <h1>Questao: {quizQuestionIndex + 1}</h1>

            <input
              className="text-cyan-300"
              type="text"
              value={quizQuestion.question}
              onChange={(event) =>
                handleQuizQuestionTitleChange(event, quizQuestionIndex)
              }
            />

            {quizQuestion.alternatives.map(
              (alternative, quizQuestionAlternativeIndex) => (
                <div key={alternative.id}>
                  <input
                    className="text-black"
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
                  <button
                    onClick={() =>
                      removeQuizQuestionAlternative(
                        quizQuestionIndex,
                        quizQuestionAlternativeIndex
                      )
                    }
                  >
                    Remove
                  </button>
                  <input
                    type="radio"
                    checked={alternative.isCorrect}
                    onChange={() =>
                      handleAlternativeIsCorrectChange(
                        quizQuestionIndex,
                        quizQuestionAlternativeIndex
                      )
                    }
                  />
                </div>
              )
            )}
            <button
              onClick={() => addQuizQuestionAlternative(quizQuestionIndex)}
            >
              Adicionar Alternativa
            </button>
          </div>
        ))}
      </div>

      <button onClick={addQuizQuestion}>Adicionar pergunta</button>
    </div>
  );
}
