import { useState, useEffect } from "react";
import QuizQuestionModel from "../models/QuizQuestionModel";
import QuizQuestionAlternative from "../models/QuizQuestionAlternative";
import { BsFillTrash3Fill, BsFillPlusSquareFill } from "react-icons/bs";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import QuizModel from "../models/QuizModel";
import { Toaster, toast } from "react-hot-toast";

interface MakeQuizProps {
  isMenuOpen: boolean;
}

export default function MakeQuiz(props: MakeQuizProps) {
  const LOCAL_STORAGE_ITEM_NAME = "creating-quiz-data";
  const localStorageData = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME);
  const initialQuizQuestions = localStorageData
    ? JSON.parse(localStorageData)
    : [];

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [quizQuestionIndexToDelete, setQuizQuestionIndexToDelete] =
    useState<number>(-1);

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
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

  function removeQuizQuestionCheck(index: number) {
    setQuizQuestionIndexToDelete(index);
    setShowDeleteConfirmationModal(true);
  }

  function removeQuizQuestion(index: number) {
    console.log("sad");
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

  function checkQuizBasicData(): boolean {
    if (!quizTitle) {
      toast.error("Digite um título para o Quiz.");
      return false;
    }

    if (!quizDescription) {
      toast.error("Digite uma descrição para o Quiz.");
      return false;
    }

    return true;
  }

  function checkQuizQuestions(): boolean {
    if (quizQuestions.length == 0) {
      toast.error("Adicione uma questão para o Quiz.");
      return false;
    }

    for (let quizIndex = 0; quizIndex < quizQuestions.length; quizIndex++) {
      let quizQuestion = quizQuestions[quizIndex];
      let alternatives: QuizQuestionAlternative[] = quizQuestion.alternatives;
      let haveCorrectAlternative = false;

      if (!quizQuestion.question) {
        toast.error(`A Questão ${quizIndex + 1} não possue pergunta.`);
        return false;
      }

      if (alternatives.length == 0) {
        toast.error(`A Questão ${quizIndex + 1} não possue alternativas.`);
        return false;
      }

      for (
        let alternativeIndex = 0;
        alternativeIndex < alternatives.length;
        alternativeIndex++
      ) {
        let alternative: QuizQuestionAlternative =
          alternatives[alternativeIndex];

        if (!alternative.question) {
          toast.error(
            `A Alternativa ${alternativeIndex + 1} da Questão ${
              quizIndex + 1
            } não possui texto.`
          );
          return false;
        }
        if (alternative.isCorrect) haveCorrectAlternative = true;
      }

      if (haveCorrectAlternative == false) {
        toast.error(
          `Não existe Alternativa correta na Questão ${quizIndex + 1}.`
        );
        return false;
      }
    }

    return true;
  }

  function doneQuiz() {
    if (checkQuizBasicData() == false) return;
    if (checkQuizQuestions() == false) return;

    const quizData: QuizModel = {
      title: quizTitle,
      description: quizDescription,
      questions: quizQuestions,
    };

    alert("vai criar em");
  }

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8 text-white text-center">
      <p className="text-2xl md:text-6xl font-bold">Faça o seu quiz</p>
      <div className="flex flex-col gap-2 md:gap-6 md:w-1/2 md:m-auto">
        <label className="text-lg md:text-4xl font-bold ">Título</label>
        <input
          className="text-lg md:text-4xl p-2 md:p-6 bg-gray-950 border-4 md:border-8 rounded-md font-bold border-yellow-400"
          type="text"
          value={quizTitle}
          onChange={(event) => {
            setQuizTitle(event.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-6 md:w-1/2 md:m-auto">
        <label className="text-lg md:text-4xl font-bold ">Descrição</label>
        <input
          className="text-lg md:text-4xl p-2 md:p-6 bg-gray-950 border-4 md:border-8 rounded-md font-bold border-yellow-400"
          type="text"
          value={quizDescription}
          onChange={(event) => {
            setQuizDescription(event.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-16 md:w-2/3 mt-6 md:m-auto md:mt-10">
        {quizQuestions.map((quizQuestion, quizQuestionIndex) => (
          <div
            className={`flex flex-col gap-6 md:gap-10 rounded-md p-4 border-4 md:border-8 ${
              quizQuestionIndex % 2 == 0
                ? "border-yellow-400"
                : "border-blue-100"
            }`}
            key={quizQuestionIndex}
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
              className="flex items-center justify-center rounded-md text-md md:text-3xl md:w-1/4 md:m-auto p-2 md:p-4 font-bold bg-red-500"
              onClick={() => removeQuizQuestionCheck(quizQuestionIndex)}
            >
              <BsFillTrash3Fill />
            </button>

            {quizQuestion.alternatives.map(
              (alternative, quizQuestionAlternativeIndex) => (
                <div
                  className="flex flex-col gap-6"
                  key={quizQuestionAlternativeIndex}
                >
                  <div
                    className={`flex justify-around md:justify-center gap-x-4 items-center ${
                      props.isMenuOpen
                        ? "flex-col md:flex-row gap-y-3"
                        : "flex-row"
                    }`}
                  >
                    <input
                      className="p-1 md:p-3 text-sm md:text-2xl bg-gray-950 border-2 font-bold border-yellow-400"
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
                    <div className="flex items-center gap-3 md:gap-6">
                      <input
                        type="radio"
                        className="appearance-none cursor-pointer w-4 md:w-8 h-4 md:h-8 rounded border-2 border-white checked:bg-green-500 checked:border-transparent"
                        checked={alternative.isCorrect}
                        onChange={() =>
                          handleAlternativeIsCorrectChange(
                            quizQuestionIndex,
                            quizQuestionAlternativeIndex
                          )
                        }
                      />
                      <button
                        className="flex justify-center text-md md:text-3xl text-red-400"
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
              className="w-1/2 md:w-1/4 m-auto flex justify-center items-center text-md md:text-2xl gap-2 rounded-md bg-yellow-400 font-bold p-2 md:p-4 text-black"
              onClick={() => addQuizQuestionAlternative(quizQuestionIndex)}
            >
              <BsFillPlusSquareFill />
              Alternativa
            </button>
          </div>
        ))}
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteConfirmationModal}
        setIsOpen={setShowDeleteConfirmationModal}
        message={"Excluir a questão ?"}
        onConfirmation={() => removeQuizQuestion(quizQuestionIndexToDelete)}
      />

      <button
        className="md:w-1/3 md:m-auto p-4 md:p-6 text-md md:text-2xl font-bold bg-purple-600"
        onClick={addQuizQuestion}
      >
        Adicionar Questão
      </button>

      <button
        onClick={doneQuiz}
        className="md:w-1/3 md:m-auto p-4 md:p-6 text-md md:text-2xl font-bold bg-green-500"
      >
        Concluir Quiz
      </button>
      <Toaster position="top-right" />
    </div>
  );
}
