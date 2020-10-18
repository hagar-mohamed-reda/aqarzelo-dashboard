<?php

namespace App;
 

class Message 
{  
    
    /**
     * response json
     * @param Integer $status
     * @param String $message_en
     * @param String $message_ar
     * @param Object $data
     * @return array
     */
    public static function responseJson($status, $message_en, $message_ar = null, $data = null) {
        return [
            "status" => $status,
            "message_en" => $message_en,
            "message_ar" => ($message_ar)? $message_ar : $message_en,
            "data" => $data
        ];
    }
    
    
    /**
     * error response message
     * @param String $message_en
     * @param String $message_ar
     * @param Object $data
     * @return array
     */
    public static function error($message_en, $message_ar = null, $data = null) {
        return self::responseJson(0, $message_en, $message_ar, $data); 
    }
    
    
    /**
     * success response message
     * @param String $message_en
     * @param String $message_ar
     * @param Object $data
     * @return array
     */
    public static function success($message_en, $message_ar = null, $data = null) {
        return self::responseJson(1, $message_en, $message_ar, $data); 
    }
    
}
