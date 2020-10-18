<?php

namespace App\helper;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use App\Option;

class Lang extends Model {

    public static $LANG = "ar";
    public static $AR = "ar";
    public static $EN = "en";

    public static function getLang() {

        $option = Option::find(4);
        if ($option->value == "ar") {
            return "عربى";
        } else if ($option->value == "en") {
            return "english";
        }
    }

    public static function lang() {
        if (session("lang") == null) {
            $option = "en";
            if ($option->value == "ar") {
                Lang::$LANG = "ar";
            } else if ($option->value == "en") {
                Lang::$LANG = "en";
            } else {
                Lang::$LANG = "ar";
            }
        } else {
            Lang::$LANG = session("lang");
        }
    }

    public static function setLang($lang) {
        $option = Option::find(4);
        $option->value = $lang;

        $option->update();

        Lang::$LANG = $lang;
        session(["lang" => $lang]);
        return back();
    }

    public static function t($word) {
        return $word;
//        Lang::lang();
//        // translated word
//        $trans = "";
//        // index dictionary
//        $dic = config("dictionary");
//
//
//        if (Lang::$LANG == "ar") {
//            $arabicDic = config("dictionary_ar");
//            $index = isset($dic[$word]) ? $dic[$word] : 0;
//
//            if ($index != 0) {
//                $trans = isset($arabicDic[$index]) ? $arabicDic[$index] : $word;
//            } else {
//                $trans = $word;
//            }
//        } else if (Lang::$LANG == "en") {
//            $endic = config("dictionary_en");
//            $index = isset($dic[$word]) ? $dic[$word] : 0;
//
//            if ($index != 0) {
//                $trans = isset($endic[$index]) ? $endic[$index] : $word;
//            } else {
//                $trans = $word;
//            }
//        } else
//            $trans = $word;
//
//
//        return $trans;
    }

}
