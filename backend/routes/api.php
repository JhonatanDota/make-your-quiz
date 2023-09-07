<?php


use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\AnswerQuizController;
use App\Http\Controllers\AnalyticsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login']);

Route::get('quizes/{id}', [QuizController::class, 'getQuizById']);
Route::get('quizes', [QuizController::class, 'getAllQuizes']);

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('my-quizes', [QuizController::class, 'getMyQuizes']);
    
    Route::post('quizes', [QuizController::class, 'createQuiz']);
    
    Route::post('answer-quiz/{id}', [AnswerQuizController::class, 'createAnswerQuiz']);
    
    Route::get('my-analytics', [AnalyticsController::class, 'getMyAnalytics']);

    Route::get('my-answered-quizes', [AnswerQuizController::class, 'getMyAnsweredQuizes']);
});
