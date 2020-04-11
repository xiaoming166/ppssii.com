<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    use Helpers;

    /**
     * 请求成功返回结果
     * @param $data
     * @param string $message
     * @return mixed
     */
    public function success($data = [], string $message = 'ok')
    {
        $result = [
            'code' => 200,
            'msg'  => $message,
            'data' => !empty($data) ? $data : new \stdClass()
        ];
        return $this->response->array($result);
    }

    /**
     * 请求失败返回结果
     * @param int $code
     * @param string $errMsg
     * @return mixed
     */
    public function error(int $code = 500, string $errMsg = 'request process error')
    {
        $codeMsg = $this->getResponseCode($code);

        $transMsg = trans('common.' . $codeMsg);

        $result = [
            'code' => $code,
            'msg'  => empty($transMsg) ? $errMsg : $transMsg,
        ];
        return $this->response->array($result);
    }

    /**
     * 获取返回的code
     * @param int $code
     * @return \Illuminate\Config\Repository|mixed
     */
    public function getResponseCode(int $code)
    {
        return config('code.' . $code);
    }


    /**
     * 成功时路由跳转
     * @param $route
     * @param $message
     * @return mixed
     */
    public function successRouteTo($route, $message)
    {
        return redirect($route)->withSuccess($message);
    }

    /**
     * 成功时返回当前页
     * @param $message
     * @return mixed
     */
    public function successBackTo($message)
    {
        return redirect()->back()->withSuccess($message);
    }

    /**
     * 失败时路由跳转
     * @param $route
     * @param $message
     * @return \App\Http\Controllers\Admin\BaseController
     */
    public function errorRouteTo($route, $message)
    {
        return redirect($route)->withErrors($message);
    }

    /**
     * 失败时返回当前页
     * @param $message
     * @return $this
     */
    public function errorBackTo($message)
    {
        return redirect()->back()->withErrors($message)->withInput();
    }

    /**
     * 返回内容
     * @param $data
     * @return mixed
     */
    public function returnData($data)
    {
        if ($data['status']) {
            return $this->success($data['data']);
        }
        return $this->error($data['err_code'], $data['err_msg']);
    }

    public function verify_email(string $email): bool
    {
        if (!preg_match('/^[\w\.]+@\w+\.\w+$/i', $email)) {
            return false;
        }
        return true;
    }


}
