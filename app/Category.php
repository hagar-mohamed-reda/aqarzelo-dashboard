<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\helper\ViewBuilder;
class Category extends Model
{
    protected $fillable = [
        'name_ar','name_en', 'icon'
    ];


    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    /**
     * build view object this will make view html
     *
     * @return ViewBuilder
     */
    public function getViewBuilder() {
        $builder = new ViewBuilder($this, "rtl");

        $builder->setAddRoute(url('/admin/category/store'))
                ->setEditRoute(url('/admin/category/update') . "/" . $this->id)
                ->setCol(["name" => "id", "label" => __('id'), "editable" => false ])
                ->setCol(["name" => "name_ar", "label" => __('name_ar')])
                ->setCol(["name" => "name_en", "label" => __('name_en')])
                ->setCol(["name" => "icon", "label" => __('icon'), "type" => "image"])
                ->setUrl(url('/image/category'))
                ->build();

        return $builder;
    }
}
