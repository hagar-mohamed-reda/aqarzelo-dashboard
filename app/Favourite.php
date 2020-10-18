<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favourite extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'post_id', 'user_id' 
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

}
