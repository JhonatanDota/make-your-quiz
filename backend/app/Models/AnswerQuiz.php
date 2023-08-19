<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnswerQuiz extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'quiz_id',
        'answers',
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
    ];
}
