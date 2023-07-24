import QuizQuestionModel from "./QuizQuestionModel";
import TagsModel from "./TagsModel";

export interface QuizModel {
  id?: number;
  user_id?: number;
  title: string;
  description: string;
  questions: QuizQuestionModel[];
  difficult: number;
  tags: TagsModel;
  isActive?: boolean;
}

export const QUIZ_DEFAULT_DATA = {
  title: "",
  description: "",
  questions: [],
  difficult: 1,
  tags: [],
};
