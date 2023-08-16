<?php

namespace App\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use App\Models\Quiz;

class AnswerQuizRequest extends FormRequest
{
    public function rules()
    {
        return [
            'quiz_id' => ['required', 'integer', Rule::exists(Quiz::class, 'id')],
            'alternatives' => ['required', 'array'],
            'alternatives.*' => ['required', 'array'],
            'alternatives.*.*.id' => ['required', 'integer'],
            'alternatives.*.*.quiz_question_id' => ['required', 'integer'],
            'alternatives.*.*.choice' => ['required', 'string'],
            'alternatives.*.*.isSelected' => ['required', 'boolean'],
        ];
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
