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
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $questions = $this->input('questions');

            foreach ($questions as $question) {
                $correctCount = 0;

                foreach ($question['alternatives'] as $alternative) {
                    if ($alternative['isCorrect']) {
                        $correctCount++;
                    }
                }

                if ($correctCount !== 1) {
                    $validator->errors()->add('questions', 'Cada pergunta deve ter uma única alternativa correta.');
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
            'title.required' => 'O campo Título é obrigatório.',
            'title.min' => 'O campo Título deve ter pelo menos 3 caracteres.',

            'description.required' => 'O campo Descrição é obrigatório.',
            'description.min' => 'O campo Descrição deve ter pelo menos 3 caracteres.',

            'questions' => 'Cada pergunta deve ter uma única alternativa correta.',
            'questions.required' => 'O campo Questions é obrigatório.',
            'questions.array' => 'O campo Questions deve ser um array.',

            'questions.*.question.required' => 'O campo Question é obrigatório para todas as perguntas.',
            'questions.*.question.string' => 'O campo Question deve ser uma string para todas as perguntas.',

            'questions.*.alternatives.required' => 'O campo Alternatives é obrigatório para todas as perguntas.',
            'questions.*.alternatives.array' => 'O campo Alternatives deve ser um array para todas as perguntas.',

            'questions.*.alternatives.*.question.required' => 'O campo Question é obrigatório para todas as alternativas.',
            'questions.*.alternatives.*.question.string' => 'O campo Question deve ser uma string para todas as alternativas.',
            
            'questions.*.alternatives.*.isCorrect.required' => 'O campo isCorrect é obrigatório para todas as alternativas.',
            'questions.*.alternatives.*.isCorrect.boolean' => 'O campo isCorrect deve ser um booleano para todas as alternativas.',
        ];
    }
}
