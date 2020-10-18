<?php

namespace App;
 
use Illuminate\Support\Facades\Config;

class Dictionary 
{  
    
    /**
     * get a word from dictionary with it's key
     * @param String $key key of the word
     * @return Array array of langs
     */
    public static function get($key) {
       // load the dictionary
       $dictionary = Config::get("dictionary");
       // return array of langs
       return isset($dictionary[$key])? $dictionary[$key] : [];
    }
}
