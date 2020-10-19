<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth as authn;
use Closure;

class Auth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = authn::user();

        if ($user) {
            return $next($request);
        }

        return redirect("/admin/login");
    }
}
