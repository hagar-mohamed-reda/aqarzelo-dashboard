<?php

namespace App\helper;
 
use Lang;

class Message 
{
    
    // general messages 
    public static $ERROR = "there is an error";
    public static $ADD = "proccess has been success";
    public static $EDIT = "proccess has been success";
    public static $DONE = "proccess has been success"; 
    public static $REMOVE = "delete has been success";  
    public static $SELECT_FILE = "please select a file"; 
    public static $FILL_FIELD = "please fill all fields"; 
    public static $TIME_FORMAT = "time format not valid";   
    public static $WELCOME = "welcome back sir"; 
    public static $EMAIL_ERROR = "email already exist"; 
    public static $CANT_DELETE = "can't remove this row";   
    public static $LOGIN_ERROR = "login first";   
    
    // extension error
    public static $IMAGE_EXTENSION = "the extension allowed is [gif, jpg, png]";
    public static $PDF_EXTENSION = "the extension allowed is [pdf]";
    public static $IMAGE_MAX_SIZE = "max image size is 5M ";
    public static $FILE_MAX_SIZE = "max file size is 5M ";
     
    
    
    // website langs error 
    public static $MAIL_BOX_ERROR = "you can't send more than 2 messages in day";
    public static $MESSAGE_SENT = "message has been sent";
    public static $REGISTER_DONE = "registeration done";
    public static $ACTIVE_ERROR = "you are not active";
    public static $EMAIL_ERROR_USER = "email already exist"; 
    public static $LOGIN_FIRST = "please login first"; 
    public static $ORDER_SENT = "order has been sent to your email"; 
    public static $CART_EMPTY = "cart is empty"; 
    public static $LOGIN_ERROR_EN = "email or password error"; 
    public static $ERROR_EN = "there is an error"; 
    public static $DONE_EN = "data has been added"; 
    
    
    public static function success($message, $data=null) {
        $response = [
            "status" => 1,
            "message" => __($message),
            "data" => $data,
        ];
        
        return $response;
    }
    
    public static function error($message, $data=null) {
        $response = [
            "status" => 0,
            "message" => __($message),
            "data" => $data,
        ];
        
        return $response;
    }
}