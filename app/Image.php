<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'photo', 'post_id', 'is_360'
    ];
    
    
    /**
     * The attributes that are appended to object after loaded from db.
     *
     * @var array
     */
    protected $appends = [
        'image', 'src'
    ];
    
    /**
     * get image attribute
     *
     * @return String
     */
    public function getSrcAttribute() {
        return url('/images/posts') . "/" . $this->photo;
    }
    
    /**
     * get image attribute
     *
     * @return String
     */
    public function getImageAttribute() {
        return url('/images/posts') . "/" . $this->photo;
    }

    public function post() {
        return $this->belongsTo('App\Post', 'post_id');
    }

}
