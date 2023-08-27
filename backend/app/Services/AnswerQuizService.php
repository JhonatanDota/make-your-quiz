<?php

namespace App\Services;

use App\Models\Quiz;

class AnswerQuizService
{

    private array $answerQuizData = array();
    private int $correctCount = 0;

    public function __construct(Quiz $quiz, array $answers)
    {
        $this->quiz = $quiz;
        $this->questions = $quiz->questions;
        $this->answers = $answers;
    }

    private function getQuiz()
    {
        return $this->quiz;
    }

    public function getQuestions()
    {
        return $this->questions;
    }

    private function getAnswers()
    {
        return $this->answers;
    }

    public function getAnswerQuizData()
    {
        return $this->answerQuizData;
    }

    public function getCorrectCount()
    {
        return $this->correctCount;
    }

    private function increaseCorrectCount(int $value = 1)
    {
        $this->correctCount += $value;
    }

    private function feedAnswersData(array $answeredQuestionData)
    {
        array_push($this->answerQuizData, $answeredQuestionData);
    }

    public function evaluateAnswers()
    {
        foreach ($this->getAnswers()['questions'] as $answeredQuestion) {
            $quizQuestion = $this->getQuestions()->find($answeredQuestion['quiz_question_id']);
            $questionAlternatives = $quizQuestion->alternatives;
            $answeredQuestionData = array();

            $answeredQuestionData['question'] = $quizQuestion->question;
            $answeredQuestionData['alternatives'] = array();

            foreach ($answeredQuestion['alternatives'] as $answeredAlternative) {
                $questionAlternative = $questionAlternatives->find($answeredAlternative['id']);
                $isSelected = $answeredAlternative['is_selected'];
                $guessed = false;

                if ($isSelected)
                    if ($questionAlternative->is_correct) {
                        $this->increaseCorrectCount();
                        $guessed = true;
                        
                    }


                array_push($answeredQuestionData['alternatives'], [
                    'choice' => $questionAlternative->choice,
                    'is_selected' => $isSelected,
                    'guessed' => $guessed
                ]);
            }

            $this->feedAnswersData($answeredQuestionData);
        }
    }
}
