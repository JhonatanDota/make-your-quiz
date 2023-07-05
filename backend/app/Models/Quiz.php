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
        'title',
        'description',
        'rating',
        'finished_count'
    ];

    /**
     * The attributes to hide.
    */

    protected $hidden = [];

    /**
     * The attributes that should be casted to native types
     */
    protected $casts = [
        'title' => 'string',
        'description' => 'string',
        'rating' => 'integer',
        'finished_count' => 'integer',
    ];
}
