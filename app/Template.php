<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable = [
        'name', 'url','photo','price','active'
    ];

    public function companies()
    {
        return $this->hasMany('App\Company');
    }
}
