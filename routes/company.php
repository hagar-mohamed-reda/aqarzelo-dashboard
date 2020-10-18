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
// company routes
//********************************************
// check if user login

Route::group(["middleware" => "company"], function() {

    // company routes
    Route::get("company/", "company\DashboardController@index");
    Route::get("company/main", "company\DashboardController@main");

    // user routes
    Route::get("company/user", "company\UserController@index");
    Route::post("company/user/store", "company\UserController@store");
    Route::get("company/user/data", "company\UserController@getData");
    Route::get("company/user/edit/{user}", "company\UserController@edit");
    Route::get("company/user/remove/{user}", "company\UserController@destroy");
    Route::post("company/user/update/{user}", "company\UserController@update");


    // post routes
    Route::get("company/post", "admin\PostController@index");
    Route::get("company/post/create", "admin\PostController@create");
    Route::post("company/post/store", "admin\PostController@store");
    Route::get("company/post/data", "admin\PostController@getData");
    Route::get("company/post/edit/{post}", "admin\PostController@edit");
    Route::get("company/post/remove/{post}", "admin\PostController@destroy");
    Route::post("company/post/update/{post}", "admin\PostController@update");

    // profile routes
    Route::get("admin/profile", "admin\ProfileController@index");
    Route::post("admin/profile/update", "admin\ProfileController@update");
    Route::post("admin/profile/update-password", "admin\ProfileController@updatePassword");
    Route::post("admin/profile/update-phone", "admin\ProfileController@updatePhone");

});



// auth route
//Route::get("students", "admin\LoginController@studentLogin");
Route::get("company/login", "company\LoginController@index");
Route::post("company/login", "company\LoginController@login");
//Route::post("company/register", "company\LoginController@register");
//Route::post("company/forget-password", "company\LoginController@forgetPassword");
//Route::post("company/confirm-account", "company\LoginController@confirmAccount");
Route::get("company/logout", "company\LoginController@logout");

