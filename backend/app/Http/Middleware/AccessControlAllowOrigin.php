<?php


namespace App\Http\Middleware;

use Closure;

class AccessControlAllowOrigin
{
    /**
     *
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $origin   = $request->server('HTTP_ORIGIN') ? $request->server('HTTP_ORIGIN') : '*';
        $response->headers->add(['Access-Control-Allow-Origin' => '*']);
        $response->headers->add(['Access-Control-Allow-Headers' => 'Origin, Authorization,Token,Content-Type,Pragma,Cache-Control,X-Requested-With,Cookie,X-CSRF-TOKEN,Accept,uuid,Referer']);
        $response->headers->add(['Access-Control-Expose-Headers' => 'Authorization,authenticated']);
        $response->headers->add(['Access-Control-Allow-Methods' => 'GET, POST, PATCH, PUT, OPTIONS']);
        $response->headers->add(['Access-Control-Allow-Credentials' => 'true']);
        return $response;
    }
}
