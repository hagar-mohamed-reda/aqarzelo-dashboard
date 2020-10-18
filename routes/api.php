<?php

use Illuminate\Http\Request;

/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register API routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | is assigned the "api" middleware group. Enjoy building your API!
  |
 */
 

//****************************************************************
// user api
//****************************************************************

// auth
Route::post('/user/register', "Api\user\AuthController@register");
Route::post('/user/login', "Api\user\AuthController@login"); 
Route::post('/user/profile/update', "Api\user\AuthController@updateProfile");
Route::post('/user/forget-password', "Api\user\AuthController@forgetPassword");
Route::post('/user/reset-password', "Api\user\AuthController@resetPassword");
Route::post('/user/resend-sms', "Api\user\AuthController@resendSms");
Route::post('/user/change-password', "Api\user\AuthController@changePassword");
Route::post('/user/external/login', "Api\user\AuthController@loginAsExternalApi");

// company auth
Route::post('/company/register', "Api\company\AuthController@register");
Route::post('/company/login', "Api\company\AuthController@login"); 
Route::post('/company/profile/update', "Api\company\AuthController@updateProfile");
Route::post('/company/forget-password', "Api\company\AuthController@forgetPassword");
Route::post('/company/reset-password', "Api\company\AuthController@resetPassword");
Route::post('/company/resend-sms', "Api\company\AuthController@resendSms");
Route::post('/company/change-password', "Api\company\AuthController@changePassword");
Route::post('/company/external/login', "Api\company\AuthController@loginAsExternalApi");

// main
Route::post('/user/favourite/toggle', "Api\user\MainController@toggleFavourite");
Route::get('/user/favourite/get', "Api\user\MainController@getFavourites");
Route::post('/user/review/add', "Api\user\MainController@addReview");
Route::get('/user/review/get', "Api\user\MainController@getReviews");
Route::get('/user/notification/get', "Api\user\MainController@getNotifications");
Route::post('/user/post/remove', "Api\user\MainController@removePost");
Route::get('/user/post/get', "Api\user\MainController@getPosts");


//****************************************************************
// post api
//****************************************************************
Route::post('/post/add', "Api\post\MainController@addPost");
Route::post('/post/update', "Api\post\MainController@updatePost"); 
Route::get('/post/search', "Api\post\MainController@search");
Route::get('/post/recommended', "Api\post\MainController@getRecommended");
Route::get('/post/get', "Api\post\MainController@get");
Route::get('/post/add-view', "Api\post\MainController@addView");
Route::post('/post/add-image', "Api\post\MainController@uploadImage");
Route::post('/post/remove-image', "Api\post\MainController@removeImage");
Route::get('/post/image/get', "Api\post\MainController@getImages");
 



//****************************************************************
// chat api
//**************************************************************** 
Route::post('/chat/send', "Api\ChatController@sendMessage");
Route::get('/chat/get', "Api\ChatController@getMessages");
Route::get('/chat/user/get', "Api\ChatController@getUsers");



//****************************************************************
// global api
//**************************************************************** 
Route::get('/city/get', "Api\MainController@getCities");
Route::get('/area/get', "Api\MainController@getAreas");
Route::get('/category/get', "Api\MainController@getCategories");
Route::get('/ads/get', "Api\MainController@getAds");
Route::get('/setting/get', "Api\MainController@getSetting");
Route::post('/firebase/update', "Api\MainController@updateFirebaseToken");
