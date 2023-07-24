import QuizQuestionAlternativeModel from "./QuizQuestionAlternativeModel";

export default interface QuizQuestionModel {
    id?: number,
    question: string,
    alternatives: QuizQuestionAlternativeModel[]
}
  