<?php

namespace App\Repositories;

use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\QuestionAlternative;
use App\Interfaces\QuizRepositoryInterface;

class QuizRepository implements QuizRepositoryInterface
{
    public function getAllQuizes(int $quantityByPage = 3) 
    {
        return Quiz::with('questions')->paginate($quantityByPage);
    }

    public function getMyQuizes(int $userId, int $quantityByPage = 5)
    {
        return Quiz::with('questions')->where('user_id', $userId)->paginate($quantityByPage);
    }

    public function getQuizById(int $id) 
    {
        return Quiz::with('questions')->findOrFail($id);
    }

    public function deleteQuiz(int $id) 
    {
        Quiz::destroy($id);
    }

    public function createQuiz(array $data) 
    {
        $quiz = Quiz::create($data);

        foreach ($data['questions'] as $question) {
            $quizQuestion = QuizQuestion::create([
                'quiz_id' => $quiz->id,
                'question' => $question['question']
            ]);

            foreach ($question['alternatives'] as $alternative) {
                QuestionAlternative::create([
                    'quiz_question_id' => $quizQuestion->id,
                    'choice' => $alternative['choice'],
                    'is_correct' => $alternative['isCorrect']
                ]);
            }
        }

        return $quiz;
    }

    public function updateQuiz(int $id, array $data) 
    {
        return Quiz::find($id)->update($data);
    }
}