<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\helper\ViewBuilder;
class Ads extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'url', 'title_en', 'description_en', 'title_ar', 'description_ar', 'expire_date',
        'active', 'photo','logo'
    ];


    /**
     * The attributes that are appended to object after loaded from db.
     *
     * @var array
     */
    protected $appends = [
        'image', 'logo_url'
    ];


    /**
     * return image url
     *
     * @return String
     */
    public function getImageAttribute() {
        return AQARZELO_PUBLIC_URL . '/images/ads/' . $this->photo;

    }

    public function getLogoUrlAttribute() {
        return AQARZELO_PUBLIC_URL . '/images/ads/' . $this->logo;
    }


    /**
     * build view object this will make view html
     *
     * @return ViewBuilder
     */
    public function getViewBuilder() {
        $builder = new ViewBuilder($this, "rtl");

        $builder->setAddRoute(url('/admin/ads/store'))
                ->setEditRoute(url('/admin/ads/update') . "/" . $this->id)
                ->setCol(["name" => "id", "label" => __('id'), "editable" => false ])
                ->setCol(["name" => "title_en", "label" => __('title_en')])
                ->setCol(["name" => "title_ar", "label" => __('title_ar')])
                ->setCol(["name" => "description_en", "label" => __('description_en'), "type" => "textarea"])
                ->setCol(["name" => "description_ar", "label" => __('description_ar'), "type" => "textarea"])
                ->setCol(["name" => "expire_date", "label" => __('expire_date'), "type" => "date"])
                ->setCol(["name" => "active", "label" => __('active'), "type" => "checkbox"])
                ->setCol(["name" => "url", "label" => __('url'), "type" => "url"])
                ->setCol(["name" => "photo", "label" => __('photo'), "type" => "image"])
                ->setCol(["name" => "logo", "label" => __('logo'), "type" => "image"])
                ->setUrl(AQARZELO_PUBLIC_URL . '/images/ads')
                ->build();

        return $builder;
    }



 }
