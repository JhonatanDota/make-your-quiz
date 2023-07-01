<?php

namespace App\Interfaces;

interface UserRepositoryInterface 
{
    public function getAllUsers(int $quantityByPage);
    public function getUserById(int $userId);
    public function deleteUser(int $userId);
    public function createUser(array $data);
    public function updateUser(int $userId, array $data);
}