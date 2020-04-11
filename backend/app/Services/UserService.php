<?php


namespace App\Services;



use App\Models\UserModel;

class UserService extends BaseService
{
    public function getUserByCond(array $data = [])
    {
        $result = UserModel::query();
        if ($data['email']) {
            $result->where('email', '=', $data['email']);
        }
        $result = $result->first();
        return $result;
    }
}
