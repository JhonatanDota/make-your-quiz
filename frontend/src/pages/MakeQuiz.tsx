import { useState, useEffect, useContext } from "react";
import { QuizQuestionCreationModel } from "../models/QuizQuestionModel";
import { QuizQuestionAlternativeCreationModel } from "../models/QuizQuestionAlternativeModel";
import {
  BsFillTrash3Fill,
  BsFillPlusSquareFill,
  BsMortarboardFill,
  BsMortarboard,
} from "react-icons/bs";
import ConfirmationModal from "../components/ConfirmationModal";
import { QuizCreationModel, QUIZ_DEFAULT_DATA } from "../models/QuizModel";
import { Toaster, toast } from "react-hot-toast";
import { createQuiz } from "../requests/quiz";
import { UserContext } from "../contexts/UserContext";
import Ratting from "../components/Ratting";
import Tags from "../components/Tags";

interface MakeQuizProps {
  isMenuOpen: boolean;
}

export default function MakeQuiz(props: MakeQuizProps) {
  const { user } = useContext(UserContext);
  const MAX_DIFFICULT_RATE = 5;
  const MAX_TAGS = 3;

  const LOCAL_STORAGE_ITEM_NAME = "quiz";

  const [
    showQuestionDeleteConfirmationModal,
    setShowQuestionDeleteConfirmationModal,
  ] = useState(false);

  const [showQuizRemoveConfirmationModal, setShowQuizRemoveConfirmationModal] =
    useState(false);

  const [quizQuestionIndexToDelete, setQuizQuestionIndexToDelete] =
    useState<number>(-1);

  const [quizData, setQuizData] = useState<QuizCreationModel>(
    loadInitialQuizData()
  );

  const [creatingQuiz, setCreatingQuiz] = useState(false);

  function loadInitialQuizData(): QuizCreationModel {
    try {
      const quizDataStr: string | null = localStorage.getItem(
        LOCAL_STORAGE_ITEM_NAME
      );

      if (quizDataStr) return JSON.parse(quizDataStr);
      else return QUIZ_DEFAULT_DATA;
    } catch (error) {
      return QUIZ_DEFAULT_DATA;
    }
  }

  function handleQuizDataChange(key: string, value: any) {
    setQuizData((prevData) => ({ ...prevData, [key]: value }));
  }

  function addQuizQuestion() {
    const newQuestion: QuizQuestionCreationModel = {
      question: "Nova Questão",
      alternatives: [],
    };

    setQuizData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, newQuestion],
    }));
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(quizData));
  }, [quizData]);

  function handleQuizQuestionTitleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    quizQuestionIndex: number
  ) {
    const newQuizQuestionTitle = event.target.value;
    updateQuizQuestion(quizQuestionIndex, {
      ...quizData.questions[quizQuestionIndex],
      question: newQuizQuestionTitle,
    });
  }

  function removeQuizQuestionCheck(index: number) {
    setQuizQuestionIndexToDelete(index);
    setShowQuestionDeleteConfirmationModal(true);
  }

  function removeQuizQuestion(index: number) {
    const updatedQuestions = quizData.questions.filter(
      (_: QuizQuestionCreationModel, i: number) => i !== index
    );
    setQuizData((prevData) => ({ ...prevData, questions: updatedQuestions }));
  }

  function updateQuizQuestion(
    index: number,
    updatedQuestion: QuizQuestionCreationModel
  ) {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index] = updatedQuestion;
    setQuizData((prevData) => ({ ...prevData, questions: updatedQuestions }));
  }

  function addQuizQuestionAlternative(quizQuestionIndex: number) {
    const updatedQuestions = [...quizData.questions];
    const quizQuestion = updatedQuestions[quizQuestionIndex];

    const newAlternative: QuizQuestionAlternativeCreationModel = {
      choice: "Nova Alternativa",
      is_correct: false,
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

    const updatedQuestions = [...quizData.questions];
    const quizQuestion = updatedQuestions[quizQuestionIndex];
    quizQuestion.alternatives[quizQuestionAlternativeIndex].choice =
      newAlternativeText;

    updateQuizQuestion(quizQuestionIndex, quizQuestion);
  }

  function handleAlternativeis_correctChange(
    quizQuestionIndex: number,
    quizQuestionAlternativeIndex: number
  ) {
    const updatedQuestions = [...quizData.questions];
    const quizQuestion = updatedQuestions[quizQuestionIndex];

    const quizQuestionAlternatives = quizQuestion.alternatives;

    for (let i: number = 0; i < quizQuestionAlternatives.length; i++) {
      quizQuestionAlternatives[i].is_correct =
        i === quizQuestionAlternativeIndex;
    }

    updateQuizQuestion(quizQuestionIndex, quizQuestion);
  }

  function removeQuizQuestionAlternative(
    quizQuestionIndex: number,
    quizQuestionAlternativeIndex: number
  ) {
    const updatedQuestions = [...quizData.questions];
    const quizQuestion = updatedQuestions[quizQuestionIndex];

    const updatedAlternatives = quizQuestion.alternatives.filter(
      (_: QuizQuestionAlternativeCreationModel, i: number) =>
        i !== quizQuestionAlternativeIndex
    );

    quizQuestion.alternatives = updatedAlternatives;

    updateQuizQuestion(quizQuestionIndex, quizQuestion);
  }

  function checkQuizBasicData(): boolean {
    if (!quizData.title) {
      toast.error("Digite um título para o Quiz.");
      return false;
    }

    if (!quizData.description) {
      toast.error("Digite uma descrição para o Quiz.");
      return false;
    }

    if (!user) {
      toast.error("É necessário estar logado para criar um Quiz.");
      return false;
    }

    return true;
  }

  function checkQuizQuestions(): boolean {
    if (quizData.questions.length === 0) {
      toast.error("Adicione uma questão para o Quiz.");
      return false;
    }

    for (
      let quizIndex = 0;
      quizIndex < quizData.questions.length;
      quizIndex++
    ) {
      let quizQuestion = quizData.questions[quizIndex];
      let alternatives: QuizQuestionAlternativeCreationModel[] =
        quizQuestion.alternatives;
      let haveCorrectAlternative = false;

      if (!quizQuestion.question) {
        toast.error(`A Questão ${quizIndex + 1} não possui pergunta.`);
        return false;
      }

      if (alternatives.length === 0) {
        toast.error(`A Questão ${quizIndex + 1} não possui alternativas.`);
        return false;
      }

      for (
        let alternativeIndex = 0;
        alternativeIndex < alternatives.length;
        alternativeIndex++
      ) {
        let alternative: QuizQuestionAlternativeCreationModel =
          alternatives[alternativeIndex];

        if (!alternative.choice) {
          toast.error(
            `A Alternativa ${alternativeIndex + 1} da Questão ${
              quizIndex + 1
            } não possui texto.`
          );
          return false;
        }
        if (alternative.is_correct) haveCorrectAlternative = true;
      }

      if (haveCorrectAlternative === false) {
        toast.error(
          `Não existe Alternativa correta na Questão ${quizIndex + 1}.`
        );
        return false;
      }
    }

    return true;
  }

  function doneQuiz(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (checkQuizBasicData() === false) return;
    if (checkQuizQuestions() === false) return;

    handleCreateQuiz(quizData);
  }

  async function handleCreateQuiz(quizDataToSend: QuizCreationModel) {
    setCreatingQuiz(true);
    try {
      await createQuiz(quizDataToSend)
        .then((response) => {
          toast.success("Quiz Adicionado com Sucesso !");
          resetQuiz();
        })
        .catch((error) => {});
    } catch {
    } finally {
      setCreatingQuiz(false);
    }
  }

  function resetQuiz() {
    setQuizData({
      title: "",
      description: "",
      questions: [],
      difficult: 1,
      tags: [],
    });

    localStorage.removeItem(LOCAL_STORAGE_ITEM_NAME);
  }

  return (
    <form
      className="flex flex-col gap-y-4 md:gap-y-8 text-white text-center"
      onSubmit={(event) => doneQuiz(event)}
    >
      <p className="text-2xl md:text-4xl lg:text-5xl font-bold">
        Faça o seu quiz
      </p>
      <div className="flex flex-col gap-2 md:gap-6 md:w-1/2 md:m-auto">
        <label className="text-xl md:text-3xl lg:text-4xl font-bold">
          Título
        </label>
        <input
          className="text-lg md:text-2xl lg:text-2xl p-2 md:p-6 bg-gray-950 border-4 md:border-8 rounded-md font-bold border-yellow-400 focus:outline-none"
          type="text"
          value={quizData.title}
          onChange={(event) => {
            handleQuizDataChange("title", event.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-6 md:w-1/2 md:m-auto">
        <label className="text-xl md:text-3xl lg:text-4xl font-bold">
          Descrição
        </label>
        <input
          className="text-lg md:text-2xl lg:text-2xl p-2 md:p-6 bg-gray-950 border-4 md:border-8 rounded-md font-bold border-yellow-400 focus:outline-none"
          type="text"
          value={quizData.description}
          onChange={(event) => {
            handleQuizDataChange("description", event.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 md:gap-6 md:w-1/2 md:m-auto">
        <label className="text-xl md:text-3xl lg:text-4xl font-bold">
          Tags
        </label>
        <Tags
          max={MAX_TAGS}
          tags={quizData.tags}
          setTags={(tags) => handleQuizDataChange("tags", tags)}
        />
      </div>

      <div className="flex flex-col gap-2 md:gap-6 md:w-1/2 md:m-auto">
        <label className="text-xl md:text-3xl lg:text-4xl font-bold">
          Nível de Dificuldade
        </label>
        <div className="flex justify-center gap-2 md:gap-4">
          <Ratting
            max={MAX_DIFFICULT_RATE}
            icon={<BsMortarboard />}
            fillIcon={<BsMortarboardFill className="text-red-500" />}
            rating={quizData.difficult}
            setRatting={(rating) => handleQuizDataChange("difficult", rating)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-16 md:w-2/3 mt-6 md:m-auto md:mt-10">
        {quizData.questions.map(
          (
            quizQuestion: QuizQuestionCreationModel,
            quizQuestionIndex: number
          ) => (
            <div
              className={`flex flex-col gap-6 md:gap-10 rounded-md p-4 border-4 md:border-8 ${
                quizQuestionIndex % 2 === 0
                  ? "border-yellow-400"
                  : "border-blue-100"
              }`}
              key={quizQuestionIndex}
            >
              <p className="text-lg mt-4 md:text-2xl uppercase font-bold">
                Questao: {quizQuestionIndex + 1}
              </p>

              <div className="flex flex-col gap-4 md:w-2/3 md:m-auto">
                <label className="text-lg md:text-2xl font-bold">
                  Pergunta
                </label>
                <input
                  className="text-lg md:text-2xl p-2 md:p-4 bg-gray-950 border-4 font-bold border-yellow-400 focus:outline-none"
                  type="text"
                  value={quizQuestion.question}
                  onChange={(event) =>
                    handleQuizQuestionTitleChange(event, quizQuestionIndex)
                  }
                />
              </div>
              <button
                type="button"
                className="flex items-center justify-center rounded-md text-md md:text-3xl md:w-1/4 md:m-auto p-2 md:p-4 font-bold bg-red-500"
                onClick={() => removeQuizQuestionCheck(quizQuestionIndex)}
              >
                <BsFillTrash3Fill />
              </button>

              {quizQuestion.alternatives.map(
                (
                  alternative: QuizQuestionAlternativeCreationModel,
                  quizQuestionAlternativeIndex: number
                ) => (
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
                        className="p-1 md:p-3 text-sm md:text-lg lg:text-2xl bg-gray-950 border-2 font-bold border-yellow-400 focus:outline-none"
                        type="text"
                        value={alternative.choice}
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
                          checked={alternative.is_correct}
                          onChange={() =>
                            handleAlternativeis_correctChange(
                              quizQuestionIndex,
                              quizQuestionAlternativeIndex
                            )
                          }
                        />
                        <button
                          type="button"
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
                type="button"
                className="w-1/2 md:w-1/4 m-auto flex justify-center items-center text-md md:text-md lg:text-2xl gap-2 rounded-md bg-yellow-400 font-bold p-2 md:p-4 text-black"
                onClick={() => addQuizQuestionAlternative(quizQuestionIndex)}
              >
                <BsFillPlusSquareFill />
                Alternativa
              </button>
            </div>
          )
        )}
      </div>

      <div className="flex flex-col gap-5 md:m-auto">
        <button
          type="button"
          className="rounded-md p-4 md:p-6 text-md md:text-2xl font-bold bg-purple-600"
          onClick={addQuizQuestion}
        >
          Adicionar Questão
        </button>

        <div className="flex justify-between md:gap-16">
          <button
            onClick={() => setShowQuizRemoveConfirmationModal(true)}
            type="button"
            className="rounded-md p-4 md:p-6 text-md md:text-2xl font-bold bg-red-500"
          >
            Excluir Quiz
          </button>

          <button
            type="submit"
            disabled={creatingQuiz}
            className={`rounded-md p-4 md:p-6 text-md md:text-2xl font-bold bg-green-500 ${
              creatingQuiz
                ? "animate-pulse bg-opacity-80 cursor-not-allowed"
                : ""
            }`}
          >
            Concluir Quiz
          </button>
        </div>
      </div>
      <Toaster position="top-right" />
      <ConfirmationModal
        isOpen={showQuestionDeleteConfirmationModal}
        setIsOpen={setShowQuestionDeleteConfirmationModal}
        message={"Excluir a questão ?"}
        onConfirmation={() => removeQuizQuestion(quizQuestionIndexToDelete)}
      />

      <ConfirmationModal
        isOpen={showQuizRemoveConfirmationModal}
        setIsOpen={setShowQuizRemoveConfirmationModal}
        message={"Excluir quiz ?"}
        onConfirmation={() => resetQuiz()}
      />
    </form>
  );
}
