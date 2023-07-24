import axios from "axios";
import { API_BASE_URL } from "../config";
import { HEADER } from "../config";
import { QuizModel } from "../models/QuizModel";

const QUIZ_URL = `${API_BASE_URL}quizes/`;
const MY_QUIZES_URL = `${API_BASE_URL}my-quizes/`;

export async function getAllQuizes() {
  const response = await axios.get(QUIZ_URL, {
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

export async function createQuiz(data: QuizModel) {
  const response = await axios.post(QUIZ_URL, data, {
    headers: HEADER,
  });
  return response;
}
