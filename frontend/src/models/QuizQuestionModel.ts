import QuizQuestionAlternatives from "./QuizQuestionAlternative";

export default interface QuizQuestionModel {
    id?: number,
    question: string,
    alternatives: QuizQuestionAlternatives[]
}
  