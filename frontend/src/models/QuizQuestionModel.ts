import QuizQuestionAlternatives from "./QuizQuestionAlternatives";

export default interface QuizQuestionModel {
    id: number,
    question: string,
    alternatives: QuizQuestionAlternatives[]
}
  