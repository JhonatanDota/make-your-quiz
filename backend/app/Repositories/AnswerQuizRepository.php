<?php

namespace App\Repositories;

use App\Models\AnswerQuiz;
use App\Interfaces\AnswerQuizRepositoryInterface;

class AnswerQuizRepository implements AnswerQuizRepositoryInterface
{
    public function createAnswerQuiz(array $data) 
    {
        return AnswerQuiz::create($data);
    }
}