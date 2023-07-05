import axios from "axios";
import { API_BASE_URL } from "../config";
import { HEADER } from "../config";
import QuizModel from "../models/QuizModel";

const QUIZ_URL = `${API_BASE_URL}quizes/`;

export async function getAllQuizes() {
  const response = await axios.get(QUIZ_URL, {
    headers: HEADER,
  });
  return response;
}

export async function createQuiz(data: QuizModel) {
  const response = await axios.post(QUIZ_URL, data,{
    headers: HEADER,
  });
  return response;
}
