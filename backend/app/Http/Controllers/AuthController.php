<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\UserRequest;
use App\Repositories\UserRepository;

class AuthController extends Controller
{
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $token = auth()->attempt($credentials);

            $user = Auth::user();

            return response()->json([
                'user' => Auth::user(),
                'token' => $token
            ]);
        }

        return response()->json(['errors' => 'Unauthorized'], 401);
    }

    public function register(UserRequest $request)
    {
        $inputs = $request->all();
        $createdUser = $this->userRepository->createUser($inputs);

        return response()->json($createdUser, 201);
    }
}
