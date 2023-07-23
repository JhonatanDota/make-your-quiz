import QuizQuestionModel from "./QuizQuestionModel";

export interface QuizModel {
  id?: number;
  user_id?: number;
  title: string;
  description: string;
  questions: QuizQuestionModel[];
  difficult: number;
  tags: string[];
  isActive?: boolean;
}

export const QUIZ_DEFAULT_DATA = {
  title: "",
  description: "",
  questions: [],
  difficult: 1,
  tags: [],
};
