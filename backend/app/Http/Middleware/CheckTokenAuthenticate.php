<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckTokenAuthenticate extends BaseMiddleware
{
    /**
     * 注意，我们要继承的是 jwt 的 BaseMiddleware
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     * @throws
     *
     */
    public function handle($request, Closure $next)
    {
        $uuid = $request->header('uuid', '');

        // 若客户端传递的Uuid不为空 则默认为游客
        if (!empty($uuid)) {
            return $next($request);
        }

        // 检查此次请求中是否带有token
        if (!$this->auth->parser()->setRequest($request)->hasToken()) {
            return response()->json([
                'code' => 401,
                'msg'  => trans('common.not_login'),
            ]);
        }

        try {
            // 检查用户的登陆状态
            if ($this->auth->parseToken()->authenticate()) {
                return $next($request);
            }

            throw new UnauthorizedHttpException('jwt-auth', trans('common.not_login'));
        } catch (\Exception $exception) {
            // 暂时不用刷新token 先注释代码
//            try {
//                // 刷新用户的token
//                $token = $this->auth->refresh();
//                // 使用一次性登陆保证此次请求的成功
//                Auth::guard('api')->onceUsingId($this->auth->manager()->getPayloadFactory()->buildClaimsCollection()->toPlainArray()['sub']);
//            } catch (JWTException $exception) {
            // 如果捕获到此异常，即代表 refresh 也过期了，用户无法刷新令牌，需要重新登录。
            return response()->json([
                'code' => 401,
                'msg'  => $exception->getMessage(),
            ]);
//            }
        }
        // 在响应头中返回新的token
//        return $this->setAuthenticationHeader($next($request), $token);
    }

    /**
     * 检查此次请求中是否带有token
     * @param Request $request
     * @return array|bool|void
     * @user yun.li
     * @time 2018/12/30 下午7:11
     */
    public function checkForToken(Request $request)
    {
        if (!$this->auth->parser()->setRequest($request)->hasToken()) {
            return false;
        }
        return true;
    }

}
