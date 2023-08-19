<?php

namespace App\Repositories;

use App\Models\Quiz;
use App\Models\AnswerQuiz;
use Illuminate\Support\Facades\Auth;
use App\Services\AnswerQuizService;
use App\Interfaces\AnswerQuizRepositoryInterface;

class AnswerQuizRepository implements AnswerQuizRepositoryInterface
{
    public function createAnswerQuiz(int $quizId, array $data) 
    {
        $quizWithQuestions = Quiz::with('questions')->findOrFail($quizId);

        $answerQuizService = new AnswerQuizService(quiz: $quizWithQuestions, answers: $data);
        $answerQuizService->evaluateAnswers();

        return AnswerQuiz::create([
            'user_id' => Auth::user()->id,
            'quiz_id' => $quizId,
            'answers' => $answerQuizService->getAnswerQuizData(),
            'question_count' => $answerQuizService->getCorrectCount(),
            'correct_count' => count($answerQuizService->getQuestions()),
        ]);
    }
}