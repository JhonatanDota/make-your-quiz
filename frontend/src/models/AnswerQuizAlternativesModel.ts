import { QuizQuestionAlternativeModel } from "./QuizQuestionAlternativeModel";

export default interface AnswerQuizAlternativesModel {
  quiz_question_id: number;
  alternatives: QuizQuestionAlternativeModel[];
}
