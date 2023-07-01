import { useState } from "react";
import QuizQuestionModel from "../models/QuizQuestionModel";

export default function MakeQuiz() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestionModel[]>([]);

  function addQuizQuestion() {
    const newQuestion: QuizQuestionModel = {
      id: quizQuestions.length,
      question: "new",
      alternatives: [],
    };

    setQuizQuestions([...quizQuestions, newQuestion]);
  }

  function handleQuizQuestionTitleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    quizQuestionIndex: number
  ) {
    const newQuizQuestionTitle = event.target.value;
    const updatedQuizQuestion = quizQuestions[quizQuestionIndex];

    updatedQuizQuestion.question = newQuizQuestionTitle;

    updateQuizQuestion(quizQuestionIndex, updatedQuizQuestion);
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

    const newAlternative = {
      id: quizQuestion.alternatives.length,
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

    for (let i = 0; i < quizQuestionAlternatives.length; i++) {
      if (i != quizQuestionAlternativeIndex)
        quizQuestionAlternatives[i].isCorrect = false;
      else {
        console.log(quizQuestionAlternativeIndex);
        quizQuestionAlternatives[i].isCorrect = true;
      }
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
      <h1>Faça o seu quiz</h1>
      <div>
        <label htmlFor="">Titulo</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">Descrição</label>
        <input type="text" />
      </div>

      <div className="flex flex-col gap-5">
        {quizQuestions.map((quizQuestion, quizQuestionIndex) => (
          <div className="flex flex-col border" key={quizQuestion.id}>
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
                <div>
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
