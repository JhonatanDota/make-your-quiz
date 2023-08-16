export interface QuizQuestionAlternativeModel {
    id: number,
    choice: string,
    isCorrect: boolean,
    is_selected?: boolean,
}

export interface QuizQuestionAlternativeCreationModel {
    choice: string,
    is_correct: boolean,
}