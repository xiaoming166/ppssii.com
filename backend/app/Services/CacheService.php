<?php


namespace App\Services;

use Illuminate\Support\Facades\Redis;

class CacheService extends BaseService
{
    const RETRIEVE_PWD_TOKEN = 'user:retrieve:pwd:token:';

    /**
     * 设置重置密码的邮件token
     * @param string $key
     * @param string $value
     * @param int $timestamp
     */
    public static function setRetrievePwdToken(string $key, string $value, int $timestamp = 3600)
    {
        Redis::setex(self::RETRIEVE_PWD_TOKEN . $key, $timestamp, $value);
    }

    /**
     * 获取重置密码的token
     * @param string $key
     * @return mixed
     */
    public static function getRetrievePwdToken(string $key)
    {
        return Redis::get(self::RETRIEVE_PWD_TOKEN . $key);
    }
}
