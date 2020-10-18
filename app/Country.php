<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\helper\ViewBuilder;
class Country extends Model
{
    protected $fillable = [
        'name_ar','name_en', 'icon'
    ];

    /**
     * The attributes that are appended to object after loaded from db.
     *
     * @var array
     */
    protected $appends = [
        'icon_url'
    ];


    /**
     * return image url
     *
     * @return String
     */
    public function getIconAttribute() {
        return AQARZELO_PUBLIC_URL . '/' . $this->icon;
    }
    public function cities()
    {
        return $this->hasMany('App\City');
    }

    /**
     * build view object this will make view html
     *
     * @return ViewBuilder
     */
    public function getViewBuilder() {
        $builder = new ViewBuilder($this, "rtl");

        $builder->setAddRoute(url('/admin/country/store'))
                ->setEditRoute(url('/admin/country/update') . "/" . $this->id)
                ->setCol(["name" => "id", "label" => __('id'), "editable" => false ])
                ->setCol(["name" => "name_ar", "label" => __('name_ar'), "col" => "col-lg-12 col-md-12 col-sm-12"])
                ->setCol(["name" => "name_en", "label" => __('name_en'), "col" => "col-lg-12 col-md-12 col-sm-12"])
                ->setCol(["name" => "icon", "label" => __('icon'), "type" => "image", "col" => "col-lg-12 col-md-12 col-sm-12"])
                ->setUrl(AQARZELO_PUBLIC_URL . '/image/country')
                ->build();

        return $builder;
    }
}
