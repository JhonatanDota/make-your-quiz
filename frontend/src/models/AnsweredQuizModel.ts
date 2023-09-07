import { QuizWithoutQuestionsModel } from "./QuizModel";

export interface AnsweredQuizModel {
  user_id: number;
  quiz: QuizWithoutQuestionsModel;
  answers: AnswerModel[];
  question_count: number;
  correct_count: number;
}

export interface AnswerModel {
  question: string;
  alternatives: AlternativeModel[];
}

export interface AlternativeModel {
  choice: string;
  guessed: boolean;
  is_selected: boolean;
}