<?php

namespace App\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Response;

class QuizRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => ['required', 'min:3', 'max:75'],
            'description' => ['required', 'min:3', 'max:75'],

            'questions' => ['required', 'array'],
            'questions.*.question' => ['required', 'string'],

            'questions.*.alternatives' => ['required', 'array'],
            'questions.*.alternatives.*.choice' => ['required', 'string'],
            'questions.*.alternatives.*.is_correct' => ['required', 'boolean'],

            'tags' => ['array'],
            'tags.*' => ['string'],

            'difficult' => ['required', 'integer', 'min:1', 'max:5'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $questions = $this->input('questions');

            if(is_null($questions))
                return;

            foreach ($questions as $question) {
                $correctCount = 0;

                foreach ($question['alternatives'] as $alternative) {
                    if ($alternative['is_correct']) {
                        $correctCount++;
                    }
                }

                if ($correctCount !== 1) {
                    $validator->errors()->add('questions', 'Each question must have a unique correct alternative.');
                }
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
