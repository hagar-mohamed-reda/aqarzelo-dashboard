<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Notification extends Model
{

    protected $table = "notifications";

    protected $fillable = [
        'title', 'body', 'post_id', 'user_id', 'seen', 'title_ar', 'body_ar'
    ];


    /**
     * The attributes that are appended to object after loaded from db.
     *
     * @var array
     */
    protected $appends = [
        'post'
    ];


    /**
     * return post attribute as Object
     *
     * @return Post $post
     */
    public function getPostAttribute() {
        return $this->post()->first();
    }


    public function user() {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function post() {
        return $this->belongsTo('App\Post', 'post_id');
    }

    public function seen() {
        $this->seen = '1';
        $this->update();
    }

    public static function notify($title, $body='', $icon) {
        Notification::create([
            "title" => $title,
            "body" => $body,
            "seen" => 0,
            "icon" => $icon,
            "user_id" => Auth::user()->id,
        ]);
    }

    public static function notifyUser($title, $body='', $icon, $user) {
        Notification::create([
            "title" => $title,
            "body" => $body,
            "seen" => 0,
            "icon" => $icon,
            "user_id" => $user
        ]);
    }

}
