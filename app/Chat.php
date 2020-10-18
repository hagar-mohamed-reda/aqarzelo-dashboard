<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'seen', 'user_from', 'user_to', 'message'
    ];

     
    /**
     * The attributes that are appended to object after loaded from db.
     *
     * @var array
     */
    protected $appends = [
        'to', 'from'
    ];
    
    /**
     * return user to
     * 
     * @return Integer
     */
    public function getUserToAttribute() {
        return (int)$this->attributes['user_to'];
    } 
    
    
    /**
     * return user to object
     * 
     * @return User
     */
    public function getToAttribute() {
        return $this->userTo();
    } 
       
    
    /**
     * return user from object
     * 
     * @return User
     */
    public function getFromAttribute() {
        return $this->userFrom();
    } 
    
    public function userFrom() {
        return User::find($this->user_from, ['name', 'photo']);
    }

    public function userTo() {
        return User::find($this->user_to, ['name', 'photo']);
    }

    public function seen() {
        $this->seen = '1';
        $this->update();
    }
}
