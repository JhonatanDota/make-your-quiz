<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Requests\AnswerQuizRequest;
use App\Repositories\AnswerQuizRepository;

class AnswerQuizController extends Controller
{

    public function __construct(AnswerQuizRepository $answerQuizRepository)
    {
        $this->answerQuizRepository = $answerQuizRepository;
    }


    public function createAnswerQuiz(int $id, AnswerQuizRequest $request)
    {
        return response()->json($this->answerQuizRepository->createAnswerQuiz($id, $request->all()));
    }
}