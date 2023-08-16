import AnswerQuizAlternativesModel from "./AnswerQuizAlternativesModel";

export default interface AnswerQuizModel {
    quiz_id: number,
    questions: AnswerQuizAlternativesModel[]
}