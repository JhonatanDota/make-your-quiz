<?php

namespace App\Repositories;

use App\Models\Quiz;
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
        return Quiz::create($data);
    }

    public function updateQuiz(int $id, array $data) 
    {
        return Quiz::find($id)->update($data);
    }
}