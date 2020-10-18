<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\helper\ViewBuilder;

class Service extends Model
{
     protected $fillable = [
        'name', 'icon','max_user' ,'max_post' ,'max_post_image' ,'price'
    ];

    public function companies()
    {
        return $this->hasMany('App\Company');
    }


    /**
     * build view object this will make view html
     *
     * @return ViewBuilder
     */
    public function getViewBuilder() {
        $builder = new ViewBuilder($this, "rtl");
        $builder->setAddRoute(url('/admin/service/store'))
                ->setEditRoute(url('/admin/service/update') . "/" . $this->id)
                ->setCol(["name" => "id", "label" => __('id'), "editable" => false ])
                ->setCol(["name" => "name", "label" => __('name')])
                ->setCol(["name" => "max_user", "label" => __('max_user'), "type" => "number"])
                ->setCol(["name" => "max_post", "label" => __('max_post'), "type" => "number"])
                ->setCol(["name" => "max_post_image", "label" => __('max_post_image'), "type" => "number"])
                ->setCol(["name" => "price", "label" => __('price'), "type" => "number"])
                ->setCol(["name" => "icon", "label" => __('icon'), "type" => "image"])
                ->setUrl(url('/image/service'))
                ->build();

        return $builder;
    }

}
