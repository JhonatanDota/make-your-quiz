<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'quiz_id',
        'question',
    ];

    /**
     * The attributes to hide.
    */

    protected $hidden = ['created_at', 'updated_at'];

    /**
     * The attributes that should be casted to native types
     */
    protected $casts = [
        'quiz_id' => 'integer',
        'question' => 'string',
    ];


    /**
     * Relationships
    */

    public function alternatives(){
        return $this->hasMany(QuestionAlternative::class);
    }
}
