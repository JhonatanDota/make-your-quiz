export interface QuizQuestionAlternativeModel {
    id: number,
    choice: string,
    isCorrect: boolean,
    isSelected?: boolean,
}

export interface QuizQuestionAlternativeCreationModel {
    choice: string,
    isCorrect: boolean,
}