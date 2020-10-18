<?php

namespace App\Http\Controllers\Api\user;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Message;
use App\Helper;
use App\Dictionary;
use App\Company;
use App\User;

class AuthController extends Controller {

    /**
     * resgister user 
     *
     * @param Request $request
     * @return array $response 
     */
    public function register(Request $request) {
        // validate the data
        $validator = validator()->make($request->all(), [
            'name' => 'required', 
            'email' => 'required|email|unique:users',
            'phone' => 'required|size:11|unique:users',
            'password' => 'required|min:8', 
            'photo' => 'mimes:jpeg,png,bmp,gif,svg,webp|max:3000|nullable',
        ], [
            "name.required" => "name_required", 
            "email.required" => "email_required",
            "phone.required" => "phone_required",
            "password.required" => "password_required", 
            "email.unique" => "email_unique",
            "phone.unique" => "phone_unique",
        ]);
        
        if ($validator->fails()) {
            $key = $validator->errors()->first(); 
            
            return Message::error(trans("messages_en.".$key), trans("messages_ar.".$key));
        }

        try {
            $user = User::create($request->all());

            // encrypt password
            $user->password = bcrypt($request->password);

            // assign the user to admin company
            $user->company_id = Company::$ADMIN_COMPANY_ID;

            $user->api_token = Helper::randamToken();

            if ($request->photo)
                $user->photo = Helper::uploadImg($request->file("photo"), "/users/");

            $user->save();

            return Message::success(trans("messages_en.register_done"), trans("messages_ar.register_done"), $user);
        } catch (Exception $e) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
    }

    /**
     * verfiy user account with sms code
     *
     * @param Request $request
     * @return void
     */
    public function verifyAccount(Request $request) {
        // code here
    } 
 
    /**
     * login user api
     *
     * @param Request $request
     * @return void
     */
    public function login(Request $request) {
        $validator = validator()->make($request->all(), [
            'phone' => 'required',
            'password' => 'required|min:8',
        ], [ 
            "password.required" => "password_required", 
            "phone.required" => "phone_required",
        ]);
        
        if ($validator->fails()) {
            $key = $validator->errors()->first();  
            return Message::error(trans("messages_en.".$key), trans("messages_ar.".$key));
        }

        try { 
            $user = User::where("phone", $request->phone)->orWhere("email", $request->phone)->first();
            //$user = User::where('phone', $request->phone)->first();

            if (!$user) {
                return Message::error(trans("messages_en.phone_or_password_error"), trans("messages_ar.phone_or_password_error"));
            }
            
            if (Hash::check($request->password, $user->password)) {

                if (!$user->isActive()) {
                    return Message::error(trans("messages_en.account_not_active"), trans("messages_ar.account_not_active"));
                }

                //if (!$user->api_token)
                $user->api_token = Helper::randamToken();
                $user->update();

                return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $user);
            } 
        } catch (\Exception $e) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
        
        return Message::error(trans("messages_en.phone_or_password_error"), trans("messages_ar.phone_or_password_error"));
    }

    /**
     * update user profile info
     *
     * @param Request $request
     * @return void
     */
    public function updateProfile(Request $request) { 
        $user = User::auth($request);
         
        if (!$user)
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
 

        // check if this email is exist
        $user1 = User::where("email", $request->email)->first();
        
        // check if this phone is exist
        $user2 = User::where("phone", $request->phone)->first();

        try { 
            if ($user != $user1 && !$user1 && $request->has("email"))
                return Message::error(trans("messages_en.email_unique"), trans("messages_ar.email_unique"));

            if ($user != $user2 && !$user2 && $request->has("phone"))
                return Message::error(trans("messages_en.phone_unique"), trans("messages_ar.phone_unique"));

            $data = $request->all();
            if ($request->password)
                $data['password'] = bcrypt($request->password);

            $user->update($data);


            if ($request->photo) {
                // delete old image
                Helper::removeFile(public_path("image/users") . "/" . $user->photo); 
                // upload new image
                $user->photo = Helper::uploadImg($request->file("photo"), "/users/");
            }

            if ($request->cover) {
                // delete old cover
                Helper::removeFile(public_path("image/users") . "/" . $user->cover); 
                // upload new cover
                $user->cover = Helper::uploadImg($request->file("cover"), "/users/");
            }

            $user->update();

            return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $user->fresh());
        } catch (\Exception $exc) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
    }


    /**
     * change user password
     *
     * @param Request $request
     * @return void
     */
    public function changePassword(Request $request) { 
        $user = User::auth($request);
         
        $validator = validator()->make($request->all(), [ 
            'password' => 'required|min:8',
        ], [ 
            "password.required" => "password_required",  
        ]);
        
        if ($validator->fails()) {
            $key = $validator->errors()->first();  
            return Message::error(trans("messages_en.".$key), trans("messages_ar.".$key));
        }
        
        if (!$user)
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
  
        try {  
            $data = $request->all();

            if (Hash::check($request->old_password, $user->password)) { 
                $user->password = bcrypt($request->password);
                $user->update();
                return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $user->fresh());
            }  

            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        } catch (\Exception $exc) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
    }
    
    /**
     * send confirm code in sms to user phone
     *
     * @param Request $request
     * @return $response
     */
    public function forgetPassword(Request $request) {  
        $validator = validator()->make($request->all(), [
            'phone' => 'required',
        ], [
            "phone.required" => "phone_required", 
        ]);
        
        if ($validator->fails()) {
            $key = $validator->errors()->first();  
            return Message::error(trans("messages_en." . $key), trans("messages_ar.".$key));
        }

        try {   
            $user = User::where("phone", $request->phone)->first();
            
            if ($user) {
                $confirmCode = rand(11111, 99999);
                $user->update(['sms_code' => $confirmCode]);
    
                // send confirm message to user 
                Helper::sendSms(trans("messages_en.sms_confirm_code_message", ["code" => $confirmCode]), $user->phone);
                
                return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $user->fresh());
            }
        } catch (\Exception $e) {}
        return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
    }
    
    
    /**
     * reset password
     * get confirm code and reset the old password
     *
     * @param Request $request
     * @return $response
     */
    public function resetPassword(Request $request) { 
        $validator = validator()->make($request->all(), [ 
            'sms_code' => 'required',
            'password' => 'required',
        ], [ 
            "sms_code.required" => "sms_code_required", 
            "password.required" => "password_required", 
        ]);
        
        if ($validator->fails()) {
            $key = $validator->errors()->first();  
            return Message::error(trans("messages_en." . $key), trans("messages_ar.".$key));
        }
        
        $user = User::where("phone", $request->phone)->first();
         
        if (!$user)
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
 

        try {     
            if ($request->sms_code != $user->sms_code) 
                return Message::error(trans("messages_en.sms_code_error"), trans("messages_ar.sms_code_error"));
            
            // reset password
            $user->password = bcrypt($request->password);
            $user->update();
 
            return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $user->fresh());
        } catch (\Exception $e) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
    }


    /**
     * resend sms cofirm code to user
     *
     * @param Request $request
     * @return $response
     */
    public function resendSms(Request $request) { 
        $validator = validator()->make($request->all(), [
            'phone' => 'required',
        ], [
            "phone.required" => "phone_required", 
        ]);
        
        if ($validator->fails()) {
            $key = $validator->errors()->first();  
            return Message::error(trans("messages_en." . $key), trans("messages_ar.".$key));
        }

        $user = User::where("phone", $request->phone)->first();
         
        if (!$user)
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
 

        try {    
            // send confirm message to user 
            Helper::sendSms(trans("messages_en.sms_confirm_code_message", ["code" => $user->sms_code]), $user->phone);
            
            return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $user->fresh());
        } catch (\Exception $e) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
    }
    

    /**
     * resend sms cofirm code to user
     *
     * @param Request $request
     * @return $response
     */
    public function loginAsExternalApi(Request $request) { 
        $validator = validator()->make($request->all(), [
            'email' => 'required',
            'is_external' => 'required', 
        ]);
        
        if ($validator->fails()) {
            $key = $validator->errors()->first();  
            return Message::error($validator->errors()->first());
        }
        
        $data = $request->all();
        $data['active'] = 'active';

        $user = User::where("email", $request->email)->first();
         

        try {  
            if (!$user) {
                $user = User::create($data);
                
                if (!$user)
                    return Message::success(trans("messages_en.phone_or_password_error"), trans("messages_ar.phone_or_password_error"), null);
            }   
            if (!$user->isActive()) {
                return Message::error(trans("messages_en.account_not_active"), trans("messages_ar.account_not_active"));
            }

            $user->api_token = Helper::randamToken();
            $user->update();

            return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $user->fresh());
        } catch (\Exception $e) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"), $e->getMessage());
        }
    }
 
}
