import axios from "axios";
import { API_BASE_URL } from "../config";
import { HEADER } from "../config";
import { QuizCreationModel } from "../models/QuizModel";
import AnswerQuizModel from "../models/AnswerQuizModel";

const QUIZ_URL = `${API_BASE_URL}quizes/`;
const MY_QUIZES_URL = `${API_BASE_URL}my-quizes/`;
const ANSWER_QUIZ = `${API_BASE_URL}answer-quiz/`;
const MY_ANSWERED_QUIZES_LIST = `${API_BASE_URL}my-answered-quizes/`;

export async function getAllQuizes(page?: string) {
  const response = await axios.get(page ? page : QUIZ_URL , {
    headers: HEADER,
  });
  return response;
}

export async function getMyQuizes() {
  const response = await axios.get(MY_QUIZES_URL, {
    headers: HEADER,
  });
  return response;
}

export async function getQuiz(id: number) {
  const response = await axios.get(`${QUIZ_URL}${id}`, {
    headers: HEADER,
  });

  return response;
}

export async function createQuiz(data: QuizCreationModel) {
  const response = await axios.post(QUIZ_URL, data, {
    headers: HEADER,
  });
  return response;
}

export async function answerQuiz(data: AnswerQuizModel){
  const response = await axios.post(`${ANSWER_QUIZ}${data.quiz_id}`, data, {
    headers: HEADER,
  });
  return response;
}

export async function getMyAnsweredQuizes(){
  const response = await axios.get(MY_ANSWERED_QUIZES_LIST, {
    headers: HEADER,
  });

  return response;
}
