import QuizQuestionAlternativeModel from "./QuizQuestionAlternativeModel";

export default interface AnswerQuizModel {
    quiz_id: number,
    alternatives: QuizQuestionAlternativeModel[][]
}