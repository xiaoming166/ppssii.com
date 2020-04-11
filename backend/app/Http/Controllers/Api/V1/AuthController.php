<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Http\Requests\Api\ResetPwdMailRequest;
use App\Http\Requests\Api\ResetPwdRequest;
use App\Models\UserModel;
use App\Services\CacheService;
use App\Services\MailService;
use App\Services\UserService;
use Carbon\Carbon;

class AuthController extends BaseController
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // 这里额外注意了：官方文档样例中只除外了『login』
        // 这样的结果是，token 只能在有效期以内进行刷新，过期无法刷新
        // 如果把 refresh 也放进去，token 即使过期但仍在刷新期以内也可刷新
        // 不过刷新一次作废
        $this->middleware('checkToken', ['except' => ['login', 'refresh', 'register', 'makeUuid', 'retrievePwd', 'resetPwd']]);
        // 另外关于上面的中间件，官方文档写的是『auth:api』
        // 但是我推荐用 『jwt.auth』，效果是一样的，但是有更加丰富的报错信息返回
    }

    /**
     * 注册
     * @param RegisterRequest $request
     * @return mixed
     */
    public function register(RegisterRequest $request)
    {
        try {
            $requestData = $request->all();

            $createData = [
                'username' => $requestData['username'] ?? '',
                'email'    => $requestData['email'] ?? '',
                'phone'    => $requestData['phone'] ?? '',
                'password' => \Hash::make($requestData['password']),
                'status'   => 1
            ];

            UserModel::create($createData);

            return $this->success();

        } catch (\Exception $e) {
            return $this->error();
        }
    }

    /**
     * Get a JWT via given credentials.
     *
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $credentials = [
            'username' => $request->input('username', ''),
            'password' => $request->input('password', ''),
        ];
        if (!$token = auth('api')->attempt($credentials)) {
            return $this->error(401);
        }
        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return $this->success();
    }

    /**
     * Refresh a token.
     * 刷新token，如果开启黑名单，以前的token便会失效。
     * 值得注意的是用上面的getToken再获取一次Token并不算做刷新，两次获得的Token是并行的，即两个都可用。
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $data = [
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60
        ];
        return $this->success($data);
    }

    /**
     * 获取uuid
     * @return mixed
     */
    public function makeUuid()
    {
        $uuid = \Str::uuid();

        $return = [
            'uuid' => $uuid
        ];

        return $this->success($return);
    }


    /**
     * 重置密码发送邮件
     * @param ResetPwdMailRequest $request
     * @param UserService $userService
     * @return mixed
     */
    public function retrievePwd(ResetPwdMailRequest $request, UserService $userService)
    {
        try {
            $email = $request->input('email', '');

            // 校验邮箱是否存在用户
            $user = $userService->getUserByCond(['email' => $email]);
            if (empty($user)) {
                return $this->error(40006);
            }

            $resetPwdUrl = config('app.url') . '/api/resetPwd';
            $token       = md5($user->id . $user->username . $user->password);
            $resetPwdUrl .= '?token=' . $token;
            CacheService::setRetrievePwdToken($email, $token, 600);

            $data = [
                'username' => $user->username ?? '',
                'link'     => $resetPwdUrl,
                'minutes'  => 10,
                'endTime'  => Carbon::now()->addMinute(10)->toDateTimeString(),
                'admin'    => config('app.admin_mail'),
            ];

            $sendData = [
                'subject'     => '密码找回',
                'format'      => 'html',
                'to'          => $email,
                'body'        => 'email.retrieve',
                'attachments' => [],
                'data'        => $data
            ];

            MailService::sendMail($sendData);
            return $this->success();
        } catch (\Exception $e) {
            return $this->error();
        }
    }

    /**
     * 重置密码(用户重置)
     * @param ResetPwdRequest $request
     * @param UserService $userService
     * @return mixed
     */
    public function resetPwd(ResetPwdRequest $request, UserService $userService)
    {
        $requestData = $request->all();
        $user        = $userService->getUserByCond(['email' => $requestData['email']]);
        if (empty($user)) {
            return $this->error(40006);
        }

        // 获取发送邮件的token
        $token = CacheService::getRetrievePwdToken($requestData['email']);
        if (empty($token)) {
            return $this->error(40007);
        }

        // 判断token是否正确
        $confirmToken = md5($user->id . $user->username . $user->password);
        if ($confirmToken != $token) {
            return $this->error(40008);
        }

        try {
            $userModel           = UserModel::query()->where('id', '=', $user->id)->first();
            $userModel->password = \Hash::make($requestData['password']);
            $userModel->save();

            return $this->success();
        } catch (\Exception $e) {
            return $this->error();
        }
    }

}
