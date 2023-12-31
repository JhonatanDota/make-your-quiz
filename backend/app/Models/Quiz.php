<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $table = 'quizes';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'tags',
        'difficult',
        'is_active',
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
        'title' => 'string',
        'description' => 'string',
        'tags' => 'json',
        'difficult' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Relationships
    */

    public function questions(){
        return $this->hasMany(QuizQuestion::class)->with("alternatives");
    }
}
