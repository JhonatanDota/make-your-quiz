<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;
use App\Interfaces\AnalyticsRepositoryInterface;
use App\Models\Quiz;
use App\Models\AnswerQuiz;

class AnalyticsRepository implements AnalyticsRepositoryInterface
{
    public function getMyAnalytics() :array
    {
        $user = Auth::user();

        $quizesMadedCount = Quiz::where('user_id', $user->id)->count();
        $answeredQuizesCount = AnswerQuiz::where('user_id', $user->id)->count();

        return [
            'maded' => $quizesMadedCount,
            'answered' => $answeredQuizesCount
        ];
    }
}