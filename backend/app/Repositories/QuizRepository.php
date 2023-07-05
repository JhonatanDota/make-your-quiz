<?php

namespace App\Repositories;

use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\QuestionAlternative;
use App\Interfaces\QuizRepositoryInterface;

class QuizRepository implements QuizRepositoryInterface
{
    public function getAllQuizes(int $quantityByPage = 8) 
    {
        return Quiz::paginate($quantityByPage);
    }

    public function getQuizById(int $id) 
    {
        return Quiz::findOrFail($id);
    }

    public function deleteQuiz(int $id) 
    {
        Quiz::destroy($id);
    }

    public function createQuiz(array $data) 
    {
        $quiz = Quiz::create([
            'title' => $data["title"],
            'description' => $data["description"],
        ]);

        foreach ($data['questions'] as $question) {
            $quizQuestion = QuizQuestion::create([
                'quiz_id' => $quiz->id,
                'question' => $question["question"]
            ]);

            foreach ($question['alternatives'] as $alternative) {
                QuestionAlternative::create([
                    'quiz_question_id' => $quizQuestion->id,
                    'choice' => $alternative['question'],
                    'is_correct' => $alternative['isCorrect']
                ]);
            }
        }

        return $quiz->getQuizWithQuestionsAndAlternatives();
    }

    public function updateQuiz(int $id, array $data) 
    {
        return Quiz::find($id)->update($data);
    }
}