<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Http\Exceptions\HttpResponseException;

use Illuminate\Contracts\Validation\Validator;

use Illuminate\Http\Response;

class UserRequest extends FormRequest
{

    public function rules()
    {
        return [
            'first_name' => ['required', 'min:3', 'max:75', 'regex:/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/'],
            'last_name' => ['required', 'min:3', 'max:75', 'regex:/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,}$/'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(
            [
                'success'   => false,
                'message'   => 'Validation errors',
                'errors'      => $validator->errors()
            ],
            Response::HTTP_BAD_REQUEST
        ));
    }

    public function messages()
    {
        return [
            'first_name.required'  => 'O campo Nome é obrigatório.',
            'first_name.min'  => 'O campo Nome deve ter pelo menos 3 caracteres.',
            'first_name.regex'  => 'O campo Nome deve possuir apenas letras.',

            'last_name.required'   => 'O campo Sobrenome é obrigatório.',
            'last_name.min'  => 'O campo Sobrenome deve ter pelo menos 3 caracteres.',
            'last_name.regex'  => 'O campo Sobrenome deve possuir apenas letras.',

            'email'                => 'Email inválido.',
            'email.required'       => 'O campo Email é obrigatório.',
            'email.unique'         => 'Email já cadastrado.',

            'password.required'    => 'O campo Senha é obrigatório.',
            'password.regex'       => 'A senha deve ter pelo menos 8 caracteres, pelo menos um número e pelo menos uma letra.',
        ];
    }
}
