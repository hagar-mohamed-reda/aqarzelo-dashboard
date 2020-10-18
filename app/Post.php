<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use DB;
use App\helper\ViewBuilder;

class Post extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'active', 'title', 'description', 'user_id', 'category_id', 'type', 'address', 'phone',
        'lng', 'lat', 'ownar_type', 'phone', 'space', 'price_per_meter', 'payment_method',
        'bedroom_number', 'bathroom_number', 'floor_number', 'finishing_type', 'refused_reason',
        'real_estate_number', 'build_date', 'active', 'has_garden', 'has_parking', 'status', 'city_id',
        'area_id', 'price', 'furnished', 'title_ar'
    ];

    /**
     * The attributes that are appended to object after loaded from db.
     *
     * @var array
     */
    protected $appends = [
        'category', 'images', 'city',
        'area', 'rate', 'views',
        'rates', 'chart_data', 'contact_phone',
        'user_review', 'favourite'
    ];


    /**
     * return category object
     *
     * @return Category
     */
    public function getFavouriteAttribute() {
        return '';
        /*
        $request = new Request();
        $user = User::auth($request);

        return $user;
        if ($user) {
            if (Favourite::where("user_id", $user->id)->where("post_id", $this->id)->count() > 0) {
                return true;
            }
        }
        return false;*/
    }

    /**
     * return category object
     *
     * @return Category
     */
    public function getUserReviewAttribute() {
        return $this->reviews()->get();
    }

    /**
     * return category object
     *
     * @return Category
     */
    public function getContactPhoneAttribute() {
        /*$request = new Request();
        $user = User::auth($request);

        try {
            if ($user)
                return $this->user->company->phone;
            else
                return substr($this->user->company->phone, 0, 4) . "xxxxxxx";
        } catch (\Exception $exc) {
            return "xxxxxxxxxxx";
        }*/
        return null;
    }

    /**
     * return chart data
     *
     * @return Array
     */
    public function getChartDataAttribute() {
        $xData = [];
        $yData = [];
        $data = [];

        $city = $this->city_id;

        $dates = Post::where("city_id", $city)->latest()->distinct()->pluck("created_at");
        foreach ($dates as $date) {
            $date = date("Y-m-d", strtotime($date));

            if (!isset($data[$date])) {
                $data[$date] = $date;
                $xData[] = $date;
                $yData[] = Post::where("city_id", $city)->whereDate("created_at", $date)->avg("price_per_meter");
            }
        }

        return [
            "x" => $xData,
            "y" => $yData
        ];
    }

    /**
     * return category object
     *
     * @return Category
     */
    public function getCategoryAttribute() {
        return $this->category()->first();
    }

    /**
     * return category object
     *
     * @return Array Image
     */
    public function getImagesAttribute() {
        $image = new Image();
        $image->photo = 'post.jpg';

        $images = $this->images()->orderBy('updated_at')->get();

        if (count($images) > 0)
            return $images;
        else
            return [$image];
    }

    /**
     * return city object
     *
     * @return City
     */
    public function getCityAttribute() {
        return $this->city()->first();
    }

    /**
     * return area object
     *
     * @return Area
     */
    public function getAreaAttribute() {
        return $this->area()->first();
    }

    /**
     * return rate of the post from user reviews
     * rate = average of the rate
     *
     * @return integer
     */
    public function getRateAttribute() {
        return (int) $this->reviews()->avg("rate");
    }

    /**
     * return rates of the post
     *
     * @return integer
     */
    public function getRatesAttribute() {
        return $this->reviews()->count();
    }

    /**
     * return views of the post
     *
     * @return integer
     */
    public function getViewsAttribute() {
        return $this->views()->count();
    }

    /**
     * add view for post
     *
     * @param String $token [ip or mac address]
     */
    public function addView($token) {
        if (PostView::where('post_id', $this->id)->where('ip', $token)->count() == 0) {
            PostView::create([
                "post_id" => $this->id,
                "ip" => $token
            ]);
        }
    }

    public function category() {
        return $this->belongsTo('App\Category', 'category_id');
    }

    public function user() {
        $user = $this->belongsTo('App\User', 'user_id')?
        $this->belongsTo('App\User', 'user_id') : new User();
        return $user;
    }

    public function city() {
        return $this->belongsTo('App\City', 'city_id');
    }

    public function area() {
        return $this->belongsTo('App\Area', 'area_id');
    }

    public function images() {
        return $this->hasMany('App\Image', 'post_id');
    }

    public function reviews() {
        return $this->hasMany('App\PostReview');
    }

    public function views() {
        return $this->hasMany('App\PostView');
    }

    /**
     * build view object this will make view html
     *
     * @return ViewBuilder
     * 'title', 'title_ar' 'category_id' 'type'
     * 'phone' 'bedroom_number' 'bathroom_number',
        'active',  'description', 'user_id', , , 'address',
        'lng', 'lat', 'ownar_type' , 'space', 'price_per_meter', 'payment_method',
        ,  'floor_number', 'finishing_type', 'refused_reason',
        'real_estate_number', 'build_date', 'active', 'has_garden', 'has_parking', 'status', 'city_id',
        'area_id', 'price', 'furnished',
     */
    public function getViewBuilder() {
        $builder = new ViewBuilder($this, "rtl");

        $builder->setAddRoute(url('/admin/post/store'))
                ->setEditRoute(url('/admin/post/update') . "/" . $this->id)
                ->setCol(["name" => "id", "label" => __('id'), "editable" => false ])
                ->setCol(["name" => "name_ar", "label" => __('name_ar')])
                ->setCol(["name" => "name_en", "label" => __('name_en')])
                ->setUrl(url('/image/city'))
                ->build();

        return $builder;
    }
}
