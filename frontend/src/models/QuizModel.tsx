import { QuizQuestionModel, QuizQuestionCreationModel } from "./QuizQuestionModel";
import TagsModel from "./TagsModel";

export interface QuizModel {
  id: number;
  user_id?: number;
  title: string;
  description: string;
  questions: QuizQuestionModel[];
  difficult: number;
  tags: TagsModel;
}

export interface QuizCreationModel {
  title: string;
  description: string;
  questions: QuizQuestionCreationModel[];
  difficult: number;
  tags: TagsModel;
}


export const QUIZ_DEFAULT_DATA = {
  title: "",
  description: "",
  questions: [],
  difficult: 1,
  tags: [],
};
