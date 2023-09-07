<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
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

    public function getMyAnsweredQuizes()
    {
        $user = Auth::user();

        return response()->json($this->answerQuizRepository->getMyAnsweredQuizes($user->id), 200);
    }
}
