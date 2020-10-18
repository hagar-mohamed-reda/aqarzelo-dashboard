<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WebsiteReview extends Model
{
    protected $fillable = [
         'user_id','rate','comment'
    ];

     public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

}
