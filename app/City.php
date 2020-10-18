<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\helper\ViewBuilder;
class City extends Model
{
    protected $fillable = [
        'name_ar','name_en'
    ];

    public function areas()
    {
        return $this->hasMany('App\Area');
    }

    /**
     * build view object this will make view html
     *
     * @return ViewBuilder
     */
    public function getViewBuilder() {
        $builder = new ViewBuilder($this, "rtl");

        $builder->setAddRoute(url('/admin/city/store'))
                ->setEditRoute(url('/admin/city/update') . "/" . $this->id)
                ->setCol(["name" => "id", "label" => __('id'), "editable" => false ])
                ->setCol(["name" => "name_ar", "label" => __('name_ar'), "col" => "col-lg-12 col-md-12 col-sm-12"])
                ->setCol(["name" => "name_en", "label" => __('name_en'), "col" => "col-lg-12 col-md-12 col-sm-12"])
                ->setUrl(url('/image/city'))
                ->build();

        return $builder;
    }
}
