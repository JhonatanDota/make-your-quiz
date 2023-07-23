<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionAlternative extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'quiz_question_id',
        'choice',
        'is_correct'
    ];

    /**
     * The attributes to hide.
    */

    protected $hidden = ['is_correct', 'created_at', 'updated_at'];

    /**
     * The attributes that should be casted to native types
     */
    protected $casts = [
        'quiz_question_id' => 'integer',
        'choice' => 'string',
        'is_correct' => 'boolean',
    ];
}
