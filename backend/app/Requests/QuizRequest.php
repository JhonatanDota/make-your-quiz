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
            'questions.*.alternatives.*.question' => ['required', 'string'],
            'questions.*.alternatives.*.isCorrect' => ['required', 'boolean'],

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
                    if ($alternative['isCorrect']) {
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

    public function messages()
    {
        return [
            'title.required' => 'The Title field is required.',
            'title.min' => 'The Title field must be at least 3 characters long.',
            
            'description.required' => 'The Description field is required.',
            'description.min' => 'The Description field must be at least 3 characters long.',
            
            'questions' => 'Each question must have a single correct alternative.',
            'questions.required' => 'The Questions field is required.',
            'questions.array' => 'The Questions field must be an array.',
            
            'questions.*.question.required' => 'The Question field is required for all questions.',
            'questions.*.question.string' => 'The Question field must be a string for all questions.',
            
            'questions.*.alternatives.required' => 'The Alternatives field is required for all questions.',
            'questions.*.alternatives.array' => 'The Alternatives field must be an array for all questions.',
            
            'questions.*.alternatives.*.question.required' => 'The Question field is required for all alternatives.',
            'questions.*.alternatives.*.question.string' => 'The Question field must be a string for all alternatives.',
            
            'questions.*.alternatives.*.isCorrect.required' => 'The isCorrect field is required for all alternatives.',
            'questions.*.alternatives.*.isCorrect.boolean' => 'The isCorrect field must be a boolean for all alternatives.',
        ];
    }
}
