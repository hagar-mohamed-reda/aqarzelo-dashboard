<?php

namespace App;
 
class Profile 
{
    
    /**
     * profile object contain website template data
     * @var type Profilable
     */
    private $profile; 
    
    /*
     * contructor
     * @param $profile Profilable
     */
    public function __construct(Profilable $profile) { 
        $this->profile = $profile;  
        
        $this->setAttribute();
    }
    
    /**
     * get register user or company
     * 
     * @return User of Company
     */
    public static function auth() {
        if (session("type") == "USER")
            return User::find(session("user")); 
        else if (session("type") == "COMPANY")
            return Company::find(session("user"));
        else
            return null;
    }
    
    
    /**
     * set attribute if the profile object  
     *  
     */
    public function setAttribute() {
        $this->name = $this->profile->name;
        $this->email = $this->profile->email;
        $this->phone = $this->profile->phone;
        $this->photo = $this->profile->photo;
        $this->cover = $this->profile->cover;
        $this->address = $this->profile->address;
        $this->company = $this->profile->company;
        $this->city = $this->profile->city;
        $this->area = $this->profile->area;
        $this->attached_file = $this->profile->attached_file;
        $this->about = $this->profile->about;
        $this->facebook = $this->profile->facebook;
        $this->youtube_link = $this->profile->youtube_link;
        $this->youtube_video = $this->profile->youtube_video;
        $this->twitter = $this->profile->twitter;
        $this->whatsapp = $this->profile->whatsapp;
        $this->linkedin = $this->profile->linkedin;
        $this->website = $this->profile->website; 
    }
    
    
    /**
     * get posts all posts from user of company
     * @return Array
     */
    public function getPosts() { 
        $posts = [];
        if ($this->profile instanceof User) {
            $posts = $this->profile->posts()->where('status', '!=', 'user_trash')->get();
        } else if  ($this->profile instanceof Company) {
            foreach ($this->profile->users()->get() as $user) {
                foreach ($user->posts()->where('status', '!=', 'user_trash')->get() as $post) {
                    $posts[] = $post;
                }
            }
        }
        
        return $posts;
    }
    
    
    /**
     * send email to mail server or to mailbox if profile company
     */
    public function sentEmail($message, $subject, $from) {
        return Helper::sendMail($this->email, $message, $subject, $from);
    }
    
}
 
