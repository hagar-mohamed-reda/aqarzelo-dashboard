<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\helper\ViewBuilder;
class Area extends Model
{

    protected $fillable = [
        'name_ar','name_en', 'city_id'
    ];

    public function city()
    {
        return $this->belongsTo('App\City', 'city_id');
    }

    /**
     * build view object this will make view html
     *
     * @return ViewBuilder
     */
    public function getViewBuilder() {
        $builder = new ViewBuilder($this, "rtl");

        $items = [];
        foreach(City::all() as $item)
            $items[] = [$item->id, $item->name_ar];

        $builder->setAddRoute(url('/admin/area/store'))
                ->setEditRoute(url('/admin/area/update') . "/" . $this->id)
                ->setCol(["name" => "id", "label" => __('id'), "editable" => false ])
                ->setCol(["name" => "name_ar", "label" => __('name_ar')])
                ->setCol(["name" => "name_en", "label" => __('name_en')])
                ->setCol(["name" => "city_id", "label" => __('city'), "type" => "select", "data" => $items])
                ->setUrl(url('/image/area'))
                ->build();

        return $builder;
    }
}
