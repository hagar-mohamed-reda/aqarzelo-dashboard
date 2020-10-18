<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lang extends Model
{

    public static $lang = "ar";


    public static function getLang() {
        return self::$lang;
    }
}
