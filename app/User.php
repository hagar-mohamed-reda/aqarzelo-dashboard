<?php

namespace App;

use DB;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use \Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

use App\helper\ViewBuilder;

class User  extends Authenticatable
{
    use SoftDeletes;
    use Notifiable;

    /**
     * table name of user model
     *
     * @var type
     */
    protected $table = "users";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'active', 'name', 'email',
        'password', 'phone', 'photo',
        'cover', 'address', 'api_token',
        'company_id', 'lng', 'lat', 'type',
        'template_id', 'city_id', 'area_id',
        'firebase_token', 'attached_file',
        'about', 'facebook', 'youtube_link',
        'youtube_video', 'twitter', 'whatsapp',
        'linkedin', 'website', 'website_available_days',
        'sms_code', 'post_id_tmp', 'templete_id', 'is_external'
    ];


    /**
     * The attributes that are appended to object after loaded from db.
     *
     * @var array
     */
    protected $appends = [
        'photo_url', 'cover_url'
    ];


    /**
     * return category object
     *
     * @return Category
     */
    public function getCategoryAttribute() {
        return $this->category()->first();
    }


    /**
     * return url of the image of the user
     *
     * @return String
     */
    public function getPhotoUrlAttribute() {
        if (!$this->photo)
            return AQARZELO_PUBLIC_URL . '/images/user.jpg';
        return AQARZELO_PUBLIC_URL . "/images/users/" . $this->photo;
    }


    /**
     * return url of the cover image
     *
     * @return String
     */
    public function getCoverUrlAttribute() {
        return AQARZELO_PUBLIC_URL . "/images/users/" . $this->cover;
    }


    /**
     * notify all users with the post
     *
     * @param String $title_ar
     * @param String $title_en
     * @param String $body_ar
     * @param String $body_en
     */
    public static function notifyAll($title_ar, $title_en, $body_ar, $body_en, $post_id) {
        foreach (User::all() as $user) {
            $user->notify($title_ar, $title_en, $body_ar, $body_en, $post_id);
        }
    }


    /**
     * notify the user with new post status
     * notify the user with notification and firebase notification
     *
     * @param String $title_ar
     * @param String $title_en
     * @param String $body_ar
     * @param String $body_en
     * @param Integer $post_id
     */
    public function notify($title_ar, $title_en, $body_ar, $body_en, $post_id=null, $userId=null) {
        try {
            if ($post_id)
            DB::statement("delete from notifications where user_id='".$this->id."' and post_id=$post_id ");
            Notification::create([
                "title" => $title_en,
                "title_ar" => $title_ar,
                "body" => $body_en,
                "body_ar" => $body_ar,
                "user_id" => $this->id,
                "post_id" => $post_id
            ]);

            $data = [
                "title_ar" => $title_ar,
                "title_en" => $title_en,
                "body_ar" => $body_ar,
                "body_en" => $body_en,
                "post_id" => $post_id,
                "user_id" => $userId
            ];

            $token = [$this->firebase_token];
            return Helper::firebaseNotification($token, $data);
        } catch (Exception $e) {}
    }


    /**
     * check the user active or not active
     *
     * @return boolean
     */
    public function isActive() {
        return $this->active == 'active'? true : false;
    }

    /**
     * check the user login or not with api_token
     *
     * @param Request $request
     * @return User $user
     */
    public static function auth(Request $request) {
        if (!$request->api_token)
            return null;
        $user = User::where("api_token", $request->api_token)->first();
        return $user;
    }

    /**
     * send message to a user
     *
     * @param User user
     * @param String message
     */
    public function sendMessage(User $user, $message) {
        $chat = Chat::create([
            "user_from" => $this->id,
            "user_to" => $user->id,
            "message" => $message,
        ]);
        // notify the another user
        $user->notify(trans("messages_en.new_message_from", ["user" => $this->name]), trans("messages_en.new_message_from", ["user" => $this->name]), $message, $message, null, $user->id);

        return $chat;
    }


    /**
     * return all chat messages
     *
     * @return Array
     */
    public function messages() {
        return Chat::where("user_from", $this->id)->orWhere("user_to", $this->id)->get();
    }

    public function template() {
        return $this->belongsTo('App\Templete', 'templete_id');
    }

    public function city() {
        return $this->belongsTo('App\City', 'city_id');
    }

    public function area() {
        return $this->belongsTo('App\Area', 'area_id');
    }

    public function company() {
        $company = $this->belongsTo('App\Company', 'company_id')?
        $this->belongsTo('App\Company', 'company_id') : new Company();
        return $company;
    }

    public function posts() {
        return $this->hasMany('App\Post')->where("status", "!=", "user_trash");
    }

    public function notifications() {
        return $this->hasMany('App\Notification');
    }

    public function mails() {
        return $this->hasMany('App\MailBox');
    }

    public function postReviews() {
        return $this->hasMany('App\PostReview');
    }

    public function websiteReviews() {
        return $this->hasMany('App\WebsiteReview');
    }

    public function favourites() {
        return $this->hasMany('App\Favourite');
    }


    public function _can($permissionName) {
        return true;
//        try {
//            $permission = Permission::where("name", $permissionName)->first();
//
//            if (!$permission) {
//                $permission = Permission::create([
//                    "name" => $permissionName
//                ]);
//            }
//
//
//            $role = RoleHasPermission::where("role_id", $this->role_id)->where("permission_id", $permission->id)->first();
//
//            if ($role)
//                return true;
//        } catch (\Exception $exc) { }
//        return false;
    }


    /**
     * build view object this will make view html
     *
     * @return ViewBuilder
     */
    public function getViewBuilder() {
        $builder = new ViewBuilder($this, "rtl");

        $companies = [];
        foreach(Company::all() as $item)
            $companies[] = [$item->id, $item->name];

        $types = [
            ["admin", __('admin')],
            ["user_company", __('user of company')],
            ["visitor", __('visitor')],
        ];

        $builder->setAddRoute(url('/admin/user/store'))
                ->setEditRoute(url('/admin/user/update') . "/" . $this->id)
                ->setCol(["name" => "id", "label" => __('id'), "editable" => false ])
                ->setCol(["name" => "name", "label" => __('name')])
                ->setCol(["name" => "email", "label" => __('email')])
                ->setCol(["name" => "password", "label" => __('password'), "type" => "password"])
                ->setCol(["name" => "phone", "label" => __('phone'), "type" => "phone"])
                ->setCol(["name" => "photo", "label" => __('photo'), "type" => "image", "required"=> false])
                ->setCol(["name" => "address", "label" => __('address'), "type" => "text", "required"=> false])
                ->setCol(["name" => "company_id", "label" => __('company'), "type" => "select", "data" => $companies, "class" => "select2"])
                ->setCol(["name" => "type", "label" => __('type'), "type" => "select", "data" => $types])
                ->setUrl(AQARZELO_PUBLIC_URL . '/images/users')
                ->build();

        return $builder;
    }
}
