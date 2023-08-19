<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnswerQuiz extends Model
{

    protected $table = 'answers_quiz';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'quiz_id',
        'answers',
        'question_count',
        'correct_count'
    ];

    /**
     * The attributes to hide.
    */

    protected $hidden = [];

    /**
     * The attributes that should be casted to native types
     */
    protected $casts = [
        'user_id' => 'integer',
        'quiz_id' => 'integer',
        'answers' => 'json',
        'question_count' => 'integer',
        'correct_count' => 'integer',
    ];
}
