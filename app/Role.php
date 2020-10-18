<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\SoftDeletes;
use App\helper\ViewBuilder;

class Role extends Model
{
    
    use SoftDeletes;
    
    protected $table = "roles";

    protected $fillable = [
        'name' 
    ];
 

    /**
     * build view object this will make view html
     *
     * @return ViewBuilder
     */
    public function getViewBuilder() {
        $builder = new ViewBuilder($this, "rtl");
 

        $builder->setAddRoute(url('/dashboard/role/store'))
                ->setEditRoute(url('/dashboard/role/update') . "/" . $this->id)
                ->setCol(["name" => "id", "label" => __('id'), "editable" => false ])
                ->setCol(["name" => "name", "label" => __('name'), "col" => 'col-lg-12 col-md-12 col-sm-12']) 
                ->setUrl(url('/images/area'))
                ->build();

        return $builder;
    }
}
