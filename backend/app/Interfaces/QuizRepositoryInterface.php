<?php

namespace App\Interfaces;

interface QuizRepositoryInterface 
{
    public function getAllQuizes(int $quantityByPage);
    public function getQuizById(int $quizId);
    public function deleteQuiz(int $quizId);
    public function createQuiz(array $data);
    public function updateQuiz(int $quizId, array $data);
}