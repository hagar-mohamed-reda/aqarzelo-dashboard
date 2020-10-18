<?php

namespace App\Http\Controllers\Api\company;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Message;
use App\Helper;
use App\Dictionary;
use App\Company;   
class AuthController extends Controller {

    /**
     * resgister Company 
     *
     * @param Request $request
     * @return array $response 
     */
    public function register(Request $request) {
        // validate the data
        $validator = validator()->make($request->all(), [ 
            'name' => 'required', 
            'commercial_no' => 'required', 
            'email' => 'required|email|unique:companies',
            'phone' => 'required|size:11|unique:companies',
            'password' => 'required|min:8', 
        ], [
            "commercial_no.required" => trans("messages.please_fill_all_data"),  
            "name.required" => trans("messages.please_fill_all_data"),  
            "email.required" => trans("messages.please_fill_all_data"),
            "phone.required" => trans("messages.please_fill_all_data"),
            "password.required" =>trans("messages.please_fill_all_data"), 
            "email.unique" => trans("messages.email_already_exist"),
            "phone.unique" => trans("messages.phone_already_exist"),
            "password.min" => trans("messages.password_must_be_at_least_8_character"),
        ]);
        if ($validator->fails()) {
            $key = $validator->errors()->first();  
            return Message::error($key, $key);
        }

        try { 
            // assign the Company to admin company
            //$Company->company_id = Company::$ADMIN_COMPANY_ID;
 
            $data = $request->all();
            $data['active'] = 'active';
            $data['api_token'] = Helper::randamToken();
            $user = Company::create($data); 
            $user->password = bcrypt($data['password']);
            
            $user->update();
        
            if ($request->photo)
                $user->photo = Helper::uploadImg($request->file("photo"), "/Companys/");

            $user->update();

            return Message::success(trans("messages_en.register_done"), trans("messages_ar.register_done"), $user->refresh());
        } catch (Exception $e) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
    }

    /**
     * verfiy Company account with sms code
     *
     * @param Request $request
     * @return void
     */
    public function verifyAccount(Request $request) {
        // code here
    } 
 
    /**
     * login Company api
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
            $Company = Company::where("phone", $request->phone)->orWhere("email", $request->phone)->first();
            //$Company = Company::where('phone', $request->phone)->first();

            if (!$Company) {
                return Message::error(trans("messages_en.phone_or_password_error"), trans("messages_ar.phone_or_password_error"));
            }
            
            if (Hash::check($request->password, $Company->password)) {

                if ($Company->active != 'active') {
                    return Message::error(trans("messages_en.account_not_active"), trans("messages_ar.account_not_active"));
                }

                //if (!$Company->api_token)
                $Company->api_token = Helper::randamToken();
                $Company->update();

                return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $Company);
            } 
        } catch (\Exception $e) {
            return Message::error($e->getMessage(), $e->getMessage());
        }
        
        return Message::error(trans("messages_en.phone_or_password_error"), trans("messages_ar.phone_or_password_error"));
    }

    /**
     * update Company profile info
     *
     * @param Request $request
     * @return void
     */
    public function updateProfile(Request $request) { 
        $Company = Company::auth($request);
         
        if (!$Company)
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
 

        // check if this email is exist
        $Company1 = Company::where("email", $request->email)->first();
        
        // check if this phone is exist
        $Company2 = Company::where("phone", $request->phone)->first();

        try { 
            if ($Company != $Company1 && !$Company1 && $request->has("email"))
                return Message::error(trans("messages_en.email_unique"), trans("messages_ar.email_unique"));

            if ($Company != $Company2 && !$Company2 && $request->has("phone"))
                return Message::error(trans("messages_en.phone_unique"), trans("messages_ar.phone_unique"));

            $data = $request->all();
            if ($request->password)
                $data['password'] = bcrypt($request->password);

            $Company->update($data);


            if ($request->photo) {
                // delete old image
                Helper::removeFile(public_path("image/Companys") . "/" . $Company->photo); 
                // upload new image
                $Company->photo = Helper::uploadImg($request->file("photo"), "/Companys/");
            }

            if ($request->cover) {
                // delete old cover
                Helper::removeFile(public_path("image/Companys") . "/" . $Company->cover); 
                // upload new cover
                $Company->cover = Helper::uploadImg($request->file("cover"), "/Companys/");
            }

            $Company->update();

            return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $Company->fresh());
        } catch (\Exception $exc) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
    }


    /**
     * change Company password
     *
     * @param Request $request
     * @return void
     */
    public function changePassword(Request $request) { 
        $Company = Company::auth($request);
         
        $validator = validator()->make($request->all(), [ 
            'password' => 'required|min:8',
        ], [ 
            "password.required" => "password_required",  
        ]);
        
        if ($validator->fails()) {
            $key = $validator->errors()->first();  
            return Message::error(trans("messages_en.".$key), trans("messages_ar.".$key));
        }
        
        if (!$Company)
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
  
        try {  
            $data = $request->all();

            if (Hash::check($request->old_password, $Company->password)) { 
                $Company->password = bcrypt($request->password);
                $Company->update();
                return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $Company->fresh());
            }  

            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        } catch (\Exception $exc) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
    }
    
    /**
     * send confirm code in sms to Company phone
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
            $Company = Company::where("phone", $request->phone)->first();
            
            if ($Company) {
                $confirmCode = rand(11111, 99999);
                $Company->update(['sms_code' => $confirmCode]);
    
                // send confirm message to Company 
                Helper::sendSms(trans("messages_en.sms_confirm_code_message", ["code" => $confirmCode]), $Company->phone);
                
                return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $Company->fresh());
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
        
        $Company = Company::where("phone", $request->phone)->first();
         
        if (!$Company)
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
 

        try {     
            if ($request->sms_code != $Company->sms_code) 
                return Message::error(trans("messages_en.sms_code_error"), trans("messages_ar.sms_code_error"));
            
            // reset password
            $Company->password = bcrypt($request->password);
            $Company->update();
 
            return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $Company->fresh());
        } catch (\Exception $e) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
    }


    /**
     * resend sms cofirm code to Company
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

        $Company = Company::where("phone", $request->phone)->first();
         
        if (!$Company)
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
 

        try {    
            // send confirm message to Company 
            Helper::sendSms(trans("messages_en.sms_confirm_code_message", ["code" => $Company->sms_code]), $Company->phone);
            
            return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $Company->fresh());
        } catch (\Exception $e) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
    }
    

    /**
     * resend sms cofirm code to Company
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

        $Company = Company::where("email", $request->email)->first();
         

        try {  
            if (!$Company) {
                $Company = Company::create($data);
                
                if (!$Company)
                    return Message::success(trans("messages_en.phone_or_password_error"), trans("messages_ar.phone_or_password_error"), null);
            }   
            if (!$Company->isActive()) {
                return Message::error(trans("messages_en.account_not_active"), trans("messages_ar.account_not_active"));
            }

            $Company->api_token = Helper::randamToken();
            $Company->update();

            return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $Company->fresh());
        } catch (\Exception $e) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"), $e->getMessage());
        }
    }
 
}
