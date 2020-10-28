<?php

namespace App\Http\Controllers\company;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\User;
use App\helper\Message;
use App\helper\Helper;
use App\LoginHistory;
use App\Company;

class LoginController extends Controller {

    /**
     * return login view
     */
    public function index() {
        return view("company.login.login");
    }


    /**
     * login
     */
    public function login(Request $request) {
        $redirect = 'company/login';

        $validator = validator()->make($request->all(), [
            'phone' => 'required',
            'password' => 'required',
            'type' => 'required',
        ], [
            "phone.required" => __("phone_required"),
            "password.required" => __("password_required"),
            "type.required" => __("type_required"),
        ]);

        if ($validator->fails()) {
            $key = $validator->errors()->first();
            return redirect($redirect . "?status=0&msg=" . $key);
        }
        $error = __("phone or password error");


        try {
            if ($request->type == 'company') {
                $user = Company::query()
                    ->where("phone", $request->phone)
                    ->orWhere('email', $request->phone)
                    //->where("password", $request->password)
                    ->first();
            } else {
                $user = User::query()
                    ->where("phone", $request->phone)
                    ->orWhere('email', $request->phone)
                    //->where("password", $request->password)
                    ->first();
            }

            if ($user) {
                if (!Hash::check($request->password, $user->password)) {
                    return redirect($redirect . "?status=0&msg=$error");
                }


                if ($user->active == 'not_active')
                    return redirect($redirect . "?status=0&msg=" . __('your account is not confirmed'));
                Auth::login($user);
                session(["type" => $request->type]);
                return redirect('company');
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

        $redirect =  'company/login';
        Auth::logout();
        return redirect($redirect);
    }

}
