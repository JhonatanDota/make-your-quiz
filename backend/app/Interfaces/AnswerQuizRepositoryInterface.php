<?php

namespace App\Interfaces;

interface AnswerQuizRepositoryInterface 
{
    public function createAnswerQuiz(int $quizId, array $data);
}