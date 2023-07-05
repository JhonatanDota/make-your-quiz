<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionAlternativesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('question_alternatives', function (Blueprint $table) {
            $table->id();
            $table->integer('quiz_question_id')->unsigned();
            $table->foreign('quiz_question_id')->references('id')->on('quiz_questions');
            $table->string('choice');
            $table->boolean('is_correct')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('question_alternatives');
    }
}
