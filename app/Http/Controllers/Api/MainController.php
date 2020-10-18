<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Message;
use App\Helper;
use App\City;
use App\Area;
use App\Ads;
use App\Category;
use App\User;
use App\Setting;

class MainController extends Controller {

    /**
     * get all city from db
     * 
     * @return Array City
     */
    public function getCities() {
        $cities = City::all(); 
        return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $cities);
    }
    
    
    /**
     * get all area from db
     * 
     * @return Array Area
     */
    public function getAreas(Request $request) {
        if ($request->has("city_id"))
            $areas = Area::where("city_id", $request->city_id)->get();
        else
            $areas = Area::all();
        return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $areas);
    }
    
    
    /**
     * get all categories
     * 
     * @return Array Category
     */
    public function getCategories() {
        $categories = Category::all();
        return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $categories);
    }
    
    
    /**
     * get all active and not expired ads
     * 
     * @return Array Ads
     */
    public function getAds() {
        $ads = Ads::query()
                ->where("active", "active")
                ->where("expire_date", ">=", date("Y-m-d"))
                ->get();
        return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $ads);
    }
    
    
    /**
     * update token of the firebase for user
     * 
     * @return Array 
     */
    public function updateFirebaseToken(Request $request) {
        $user = User::auth($request);

        if (!$user)
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
        
        ($user && $request->firebase_token)? $user->update(['firebase_token' => $request->firebase_token]) : null; 
        
        return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $request->firebase_token);
    }
     
    
    
    /**
     * get all settings
     * get help info or about, contact
     * 
     * @return Array 
     */
    public function getSetting(Request $request) {  
        $setting = Setting::all(); 
        return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $setting);
    }
     
}
