<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\User;
use App\helper\Message;
use App\helper\Helper;
use App\LoginHistory;

class LoginController extends Controller {

    /**
     * return login view
     */
    public function index() {
        return view("admin.login.login");
    }


    /**
     * login
     */
    public function login(Request $request) {
        $redirect = $request->type == 'student'? 'students/login' : 'admin/login';

        $validator = validator()->make($request->all(), [
            'phone' => 'required',
            'password' => 'required',
        ], [
            "phone.required" => __("phone_required"),
            "password.required" => __("password_required"),
        ]);

        if ($validator->fails()) {
            $key = $validator->errors()->first();
            return redirect($redirect . "?status=0&msg=" . $key);
        }
        $error = __("phone or password error");


        try {
            $user = User::query()
            ->where("phone", $request->phone)
            ->orWhere('email', $request->phone)
            //->where("password", $request->password)
            ->first();

            if ($user) {
                if (!Hash::check($request->password, $user->password)) {
                    return redirect($redirect . "?status=0&msg=$error");
                }

                if ($user->active == 'not_active')
                    return redirect($redirect . "?status=0&msg=" . __('your account is not confirmed'));
                Auth::login($user);
                return redirect($user->type == 'student'? 'students' : 'admin');
            }
        } catch (Exception $ex) {}
        return redirect($redirect . "?status=0&msg=$error");
    }

    /**
     * logout
     *
     */
    public function logout() {
        if (!Auth::user())
            return back();

        $redirect = Auth::user()->type == 'student'? 'students/login' : 'admin/login';
        Auth::logout();
        return redirect($redirect);
    }

}
