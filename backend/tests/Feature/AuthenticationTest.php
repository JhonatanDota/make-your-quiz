<?php

namespace Tests\Feature;

use Tests\TestCase;

use App\Repositories\UserRepository;

class AuthenticationTest extends TestCase
{
    public function test_user_dont_exists_login()
    {
        $loginData = [
            'email' => 'user_1@test',
            'password' => 'pass'
        ];

        $response = $this->json('POST', 'api/login/', $loginData, ['Accept' => 'application/json']);

        $response->assertStatus(401);
        $this->assertEquals(
            ['errors' => 'Unauthorized'],
            $response->json()
        );
    }

    public function test_must_login()
    {
        $userRepository = new UserRepository();
        $email = 'test_user@email.com';
        $password = 'secretpass';

        $userRepository->createUser([
            'first_name' => 'test',
            'last_name' => 'user',
            'email' => $email,
            'password' => $password,
        ]);

        $response = $this->json('POST', 'api/login', ['email' => $email, 'password' => $password], ['Accept' => 'application/json']);
        $response->assertStatus(200);
    }

    public function test_must_login_and_return_token_field_user_field_company_field()
    {
        $userRepository = new UserRepository();

        $email = 'test_user@email.com';
        $password = 'secretpass';

        $createdUser = $userRepository->createUser([
            'first_name' => 'test',
            'last_name' => 'user',
            'email' => $email,
            'password' => $password,
        ]);


        $response = $this->json('POST', 'api/login', ['email' => $email, 'password' => $password], ['Accept' => 'application/json']);
        $response->assertStatus(200);

        $responseData = $response->json();

        $this->assertArrayHasKey('token', $responseData);
        $this->assertArrayHasKey('user', $responseData);
        $this->assertNotNull($responseData['company']);
    }

    public function test_must_create_user()
    {
        $userData = [
            'first_name' => 'test user',
            'last_name' => 'user test',
            'email' => 'test_user@email.com',
            'password' => 'secretpass@123'
        ];

        $response = $this->json('POST', 'api/register', $userData, ['Accept' => 'application/json']);
        $response->assertStatus(201);
    }

    public function test_create_user_with_accents_in_names()
    {
        $userData = [
            'first_name' => 'tést ã',
            'last_name' => 'ûs àê',
            'email' => 'test_user@email.com',
            'password' => 'secretpass@123'
        ];

        $response = $this->json('POST', 'api/register', $userData, ['Accept' => 'application/json']);
        $response->assertStatus(201);
    }

    public function test_try_create_user_without_first_name()
    {
        $userData = [
            'last_name' => 'user',
            'email' => 'test_user@email.com',
            'password' => 'secretpass@123'
        ];

        $response = $this->json('POST', 'api/register', $userData, ['Accept' => 'application/json']);
        $response->assertStatus(400);

        $responseData = $response->json();

        $this->assertArrayHasKey('first_name', $responseData["errors"]);
        $this->assertEquals(
            'O campo Nome é obrigatório.',
            $responseData['errors']['first_name'][0]
        );
    }

    public function test_try_create_user_invalid_first_name_min_characters_and_non_permitted_characters()
    {
        $userData = [
            'first_name' => 't6',
            'last_name' => 'user',
            'email' => 'test_user@email.com',
            'password' => 'secretpass@123'
        ];

        $response = $this->json('POST', 'api/register', $userData, ['Accept' => 'application/json']);
        $response->assertStatus(400);

        $responseData = $response->json();

        $this->assertArrayHasKey('first_name', $responseData["errors"]);

        $this->assertEquals(
            'O campo Nome deve ter pelo menos 3 caracteres.',
            $responseData['errors']['first_name'][0]
        );
        $this->assertEquals(
            'O campo Nome deve possuir apenas letras.',
            $responseData['errors']['first_name'][1]
        );
    }

    public function test_try_create_user_without_last_name()
    {
        $userData = [
            'first_name' => 'test',
            'email' => 'test_user@email.com',
            'password' => 'secretpass@123'
        ];

        $response = $this->json('POST', 'api/register', $userData, ['Accept' => 'application/json']);
        $response->assertStatus(400);

        $responseData = $response->json();

        $this->assertArrayHasKey('last_name', $responseData["errors"]);
        $this->assertEquals(
            'O campo Sobrenome é obrigatório.',
            $responseData['errors']['last_name'][0]
        );
    }

    public function test_try_create_user_invalid_last_name_min_characters_and_non_permitted_characters()
    {
        $userData = [
            'first_name' => 'test',
            'last_name' => 't6',
            'email' => 'test_user@email.com',
            'password' => 'secretpass@123'
        ];

        $response = $this->json('POST', 'api/register', $userData, ['Accept' => 'application/json']);
        $response->assertStatus(400);

        $responseData = $response->json();

        $this->assertArrayHasKey('last_name', $responseData["errors"]);

        $this->assertEquals(
            'O campo Sobrenome deve ter pelo menos 3 caracteres.',
            $responseData['errors']['last_name'][0]
        );
        $this->assertEquals(
            'O campo Sobrenome deve possuir apenas letras.',
            $responseData['errors']['last_name'][1]
        );
    }

    public function test_try_create_user_without_email()
    {
        $userData = [
            'first_name' => 'test',
            'last_name' => 'user',
            'password' => 'secretpass@123'
        ];

        $response = $this->json('POST', 'api/register', $userData, ['Accept' => 'application/json']);
        $response->assertStatus(400);

        $responseData = $response->json();

        $this->assertArrayHasKey('email', $responseData["errors"]);
        $this->assertEquals(
            'O campo Email é obrigatório.',
            $responseData['errors']['email'][0]
        );
    }

    public function test_try_create_user_with_existing_email()
    {
        $userRepository = new UserRepository();
        $duplicatedEmail = 'test_user@email.com';

        $userRepository->createUser([
            'first_name' => 'test',
            'last_name' => 'user',
            'email' => $duplicatedEmail,
            'password' => 'secretpass',
        ]);

        $userData = [
            'first_name' => 'test',
            'last_name' => 'user',
            'email' => $duplicatedEmail,
            'password' => 'secretpass@123'
        ];

        $response = $this->json('POST', 'api/register', $userData, ['Accept' => 'application/json']);
        $response->assertStatus(400);

        $responseData = $response->json();

        $this->assertArrayHasKey('email', $responseData["errors"]);
        $this->assertEquals(
            'Email já cadastrado.',
            $responseData['errors']['email'][0]
        );
    }

    public function test_try_create_user_with_invalid_email()
    {
        $userData = [
            'first_name' => 'test',
            'last_name' => 'user',
            'email' => 'email',
            'password' => 'secretpass@123'
        ];

        $response = $this->json('POST', 'api/register', $userData, ['Accept' => 'application/json']);
        $response->assertStatus(400);

        $responseData = $response->json();

        $this->assertArrayHasKey('email', $responseData["errors"]);

        $this->assertEquals(
            'Email inválido.',
            $responseData['errors']['email'][0]
        );
    }

    public function test_try_create_user_without_password(){
        $userData = [
            'first_name' => 'test',
            'last_name' => 'user',
            'email' => 'test_user@email.com',
        ];

        $response = $this->json('POST', 'api/register', $userData, ['Accept' => 'application/json']);
        $response->assertStatus(400);

        $responseData = $response->json();

        $this->assertArrayHasKey('password', $responseData["errors"]);

        $this->assertEquals(
            'O campo Senha é obrigatório.',
            $responseData['errors']['password'][0]
        );
    }

    public function test_try_create_user_with_invalid_password()
    {
        $userData = [
            'first_name' => 'test',
            'last_name' => 'user',
            'email' => 'test_user@email.com',
            'password' => 'aa'
        ];

        $response = $this->json('POST', 'api/register', $userData, ['Accept' => 'application/json']);
        $response->assertStatus(400);

        $responseData = $response->json();

        $this->assertArrayHasKey('password', $responseData["errors"]);

        $this->assertEquals(
            'A senha deve ter pelo menos 8 caracteres, pelo menos um número e pelo menos uma letra.',
            $responseData['errors']['password'][0]
        );
    }
}
