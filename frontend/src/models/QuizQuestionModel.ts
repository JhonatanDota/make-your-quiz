import {QuizQuestionAlternativeCreationModel, QuizQuestionAlternativeModel} from "./QuizQuestionAlternativeModel";

export interface QuizQuestionModel {
    id: number,
    question: string,
    alternatives: QuizQuestionAlternativeModel[]
}

export interface QuizQuestionCreationModel {
    question: string,
    alternatives: QuizQuestionAlternativeCreationModel[]
}

