<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
class PostReview extends Model {

    protected $fillable = [
        'post_id', 'user_id', 'rate', 'comment'
    ];

    protected $appends = [
        "user"
    ];
    
    
    /**
     * get user object
     * 
     * @return User
     */
    public function getUserAttribute() {
        $user = $this->user()->first();
        return [
            "name" => optional($user)->name,
            "photo_url" => optional($user)->photo_url
        ];
    }
    
    
    /**
     * get user object
     * 
     * @return User
     */
    public function getRateAttribute() {
        try {
            $rate = DB::table("post_reviews")->find($this->id)->rate;
            return ($rate)? (int)$rate : 0;
        }catch(\Exception $e){
            return 0;
        }
    }


    public function user() {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function post() {
        return $this->belongsTo('App\Post', 'post_id');
    }

}
