<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

use Illuminate\Support\Facades\Auth;

class AdminCompany {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        $user = Auth::user();

        if ($user && optional($user)->is_company == true) {
            return $next($request);
        }

        return redirect("/company/login");
    }

}
