import QuizQuestionModel from "./QuizQuestionModel";

export default interface QuizModel {
  id?: number;
  user_id?: number;
  title: string;
  description: string;
  questions: QuizQuestionModel[];
}
