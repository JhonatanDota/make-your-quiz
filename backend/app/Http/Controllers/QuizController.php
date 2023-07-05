<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\QuizRepository;
use App\Requests\QuizRequest;

class QuizController extends Controller
{
    public function __construct(QuizRepository $quizRepository)
    {
        $this->quizRepository = $quizRepository;
    }

    public function getAllQuizes(){
        return response()->json($this->quizRepository->getAllQuizes(), 200);
    }

    public function getQuizById(int $id){
        return response()->json($this->quizRepository->getQuizById($id), 200);
    }

    public function createQuiz(QuizRequest $request){
        $data = $request->all();
        
        return response()->json($this->quizRepository->createQuiz($data));
    }
}