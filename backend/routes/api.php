<?php


use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuizController;
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

Route::get('quizes', [QuizController::class, 'getAllQuizes']);
Route::post('quizes', [QuizController::class, 'createQuiz']);

Route::group(['middleware' => 'jwt.auth'], function () {

});
