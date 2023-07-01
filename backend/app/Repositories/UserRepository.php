<?php

namespace App\Repositories;

use App\Models\User;
use App\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function getAllUsers(int $quantityByPage) 
    {
        return User::paginate($quantityByPage);
    }

    public function getUserById(int $userId) 
    {
        return User::findOrFail($userId);
    }

    public function deleteUser(int $userId) 
    {
        User::destroy($userId);
    }

    public function createUser(array $data) 
    {
        $data['password'] = bcrypt($data['password']);
        return User::create($data);
    }

    public function updateUser(int $userId, array $data) 
    {
        return User::find($userId)->update($data);
    }
}