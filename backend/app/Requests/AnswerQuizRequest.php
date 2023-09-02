<?php

namespace App\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Carbon\Carbon;
use App\Models\Quiz;
use App\Models\AnswerQuiz;
use App\Models\QuizQuestion;
use App\Models\QuestionAlternative;

class AnswerQuizRequest extends FormRequest
{
    public function rules()
    {
        return [
            'quiz_id' => ['required', 'integer', Rule::exists(Quiz::class, 'id')],
            'questions' => ['required', 'array'],
            'questions.*.quiz_question_id' => ['required', Rule::exists(QuizQuestion::class, 'id')],
            'questions.*.alternatives' => ['required', 'array'],
            'questions.*.alternatives.*.id' => ['required', Rule::exists(QuestionAlternative::class, 'id')],
            'questions.*.alternatives.*.quiz_question_id' => ['required', 'integer'],
            'questions.*.alternatives.*.choice' => ['required', 'string'],
            'questions.*.alternatives.*.is_selected' => ['required', 'boolean'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $quizId = $this->input('quiz_id');
            $lastHours = Carbon::now()->subHours(AnswerQuiz::COOLDOWN_TO_ANSWER_AGAIN_IN_HOURS);

            $answeredLastHours = AnswerQuiz::where('user_id', Auth::user()->id)->where('quiz_id', $quizId)->where('created_at', '>=', $lastHours)->orderBy('created_at', 'DESC')->first();

            if ($answeredLastHours) {
                $hoursDiff = $answeredLastHours->created_at->diff($lastHours)->format('%H:%I:%S');
                $validator->errors()->add('answer_quiz', "Só é possível responder este quiz novamente daqui $hoursDiff.");
            }
        });
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(
            [
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ],
            Response::HTTP_BAD_REQUEST
        ));
    }
}
