import QuizQuestionModel from "./QuizQuestionModel";

export default interface QuizModel {
  id?: number;
  title: string;
  description: string;
  questions: QuizQuestionModel[];
}
