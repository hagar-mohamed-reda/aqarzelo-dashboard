<?php

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register web routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | contains the "web" middleware group. Now create something great!
  |
 */
//exit();

//********************************************
// admin routes
//********************************************
// check if user login

Route::group(["middleware" => "company"], function() {


});


Route::group(["middleware" => "admin"], function() {

    Route::get("admin/", "admin\DashboardController@index");
    Route::get("/", "admin\DashboardController@index");
    Route::get("admin/main", "admin\DashboardController@main");

    // category routes
    Route::get("admin/category", "admin\CategoryController@index");
    Route::post("admin/category/store", "admin\CategoryController@store");
    Route::get("admin/category/data", "admin\CategoryController@getData");
    Route::get("admin/category/edit/{category}", "admin\CategoryController@edit");
    Route::get("admin/category/remove/{category}", "admin\CategoryController@destroy");
    Route::post("admin/category/update/{category}", "admin\CategoryController@update");

    // user routes
    Route::get("admin/user", "admin\UserController@index");
    Route::post("admin/user/store", "admin\UserController@store");
    Route::get("admin/user/data", "admin\UserController@getData");
    Route::get("admin/user/edit/{user}", "admin\UserController@edit");
    Route::get("admin/user/remove/{user}", "admin\UserController@destroy");
    Route::post("admin/user/update/{user}", "admin\UserController@update");

    // company routes
    Route::get("admin/company", "admin\CompanyController@index");
    Route::post("admin/company/store", "admin\CompanyController@store");
    Route::get("admin/company/data", "admin\CompanyController@getData");
    Route::get("admin/company/edit/{company}", "admin\CompanyController@edit");
    Route::get("admin/company/remove/{company}", "admin\CompanyController@destroy");
    Route::post("admin/company/update/{company}", "admin\CompanyController@update");

    // city routes
    Route::get("admin/city", "admin\CityController@index");
    Route::post("admin/city/store", "admin\CityController@store");
    Route::get("admin/city/data", "admin\CityController@getData");
    Route::get("admin/city/edit/{city}", "admin\CityController@edit");
    Route::get("admin/city/remove/{city}", "admin\CityController@destroy");
    Route::post("admin/city/update/{city}", "admin\CityController@update");

    // area routes
    Route::get("admin/area", "admin\AreaController@index");
    Route::post("admin/area/store", "admin\AreaController@store");
    Route::get("admin/area/data", "admin\AreaController@getData");
    Route::get("admin/area/edit/{area}", "admin\AreaController@edit");
    Route::get("admin/area/remove/{area}", "admin\AreaController@destroy");
    Route::post("admin/area/update/{area}", "admin\AreaController@update");

    // ads routes
    Route::get("admin/ads", "admin\AdsController@index");
    Route::post("admin/ads/store", "admin\AdsController@store");
    Route::get("admin/ads/data", "admin\AdsController@getData");
    Route::get("admin/ads/edit/{ads}", "admin\AdsController@edit");
    Route::get("admin/ads/remove/{ads}", "admin\AdsController@destroy");
    Route::post("admin/ads/update/{ads}", "admin\AdsController@update");

    // service routes
    Route::get("admin/service", "admin\ServiceController@index");
    Route::post("admin/service/store", "admin\ServiceController@store");
    Route::get("admin/service/data", "admin\ServiceController@getData");
    Route::get("admin/service/edit/{service}", "admin\ServiceController@edit");
    Route::get("admin/service/remove/{service}", "admin\ServiceController@destroy");
    Route::post("admin/service/update/{service}", "admin\ServiceController@update");

    // mailbox routes
    Route::get("admin/mailbox", "admin\MailboxController@index");
    Route::post("admin/mailbox/store", "admin\MailboxController@store");
    Route::get("admin/mailbox/data", "admin\MailboxController@getData");
    Route::get("admin/mailbox/edit/{mailbox}", "admin\MailboxController@edit");
    Route::get("admin/mailbox/remove/{mailbox}", "admin\MailboxController@destroy");
    Route::post("admin/mailbox/update/{mailbox}", "admin\MailboxController@update");

    // post routes
    Route::get("admin/post", "admin\PostController@index");
    Route::get("admin/post/create", "admin\PostController@create");
    Route::post("admin/post/store", "admin\PostController@store");
    Route::get("admin/post/data", "admin\PostController@getData");
    Route::get("admin/post/edit/{post}", "admin\PostController@edit");
    Route::get("admin/post/remove/{post}", "admin\PostController@destroy");
    Route::post("admin/post/update/{post}", "admin\PostController@update");

    // notification routes
    Route::get("admin/notification", "admin\NotificationController@index");
    Route::get("admin/notification/data", "admin\NotificationController@getData");
    Route::get("admin/notification/remove/{notification}", "admin\NotificationController@destroy");


    // role routes
    Route::get("admin/role", "admin\RoleController@index");
    Route::post("admin/role/store", "admin\RoleController@store");
    Route::get("admin/role/data", "admin\RoleController@getData");
    Route::get("admin/role/edit/{role}", "admin\RoleController@edit");
    Route::get("admin/role/permission/{role}", "admin\RoleController@permissions");
    Route::post("admin/role/permission/update/{role}", "admin\RoleController@updatePermissions");
    Route::get("admin/role/remove/{role}", "admin\RoleController@destroy");
    Route::post("admin/role/update/{role}", "admin\RoleController@update");

    // profile routes
    Route::get("admin/profile", "admin\ProfileController@index");
    Route::post("admin/profile/update", "admin\ProfileController@update");
    Route::post("admin/profile/update-password", "admin\ProfileController@updatePassword");
    Route::post("admin/profile/update-phone", "admin\ProfileController@updatePhone");

    // option routes
    Route::get("admin/option/", "admin\SettingController@index");
    Route::get("admin/option/update", "admin\SettingController@update");
    Route::post("admin/option/update", "admin\SettingController@update");
    Route::post("admin/translation/update", "admin\SettingController@updateTranslation");

    // helper route
    Route::get("admin/print/{page}", "admin\HelperController@print");



});

// complaint
Route::post("admin/complain/store", "admin\ComplainController@store");

// auth route
//Route::get("students", "admin\LoginController@studentLogin");
Route::get("students/login", "admin\LoginController@studentLogin");
Route::get("admin/login", "admin\LoginController@index");
Route::post("admin/login", "admin\LoginController@login");
Route::post("admin/register", "admin\LoginController@register");
Route::post("admin/forget-password", "admin\LoginController@forgetPassword");
Route::post("admin/confirm-account", "admin\LoginController@confirmAccount");
Route::get("admin/logout", "admin\LoginController@logout");


Route::get("notify", "admin\NotificationController@get");

Route::get("test", function(Illuminate\Http\Request $request){
    echo public_path();

});

// show order
