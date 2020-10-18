<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\helper\ViewBuilder;


class MailBox extends Model
{
    protected $fillable = [
        'email', 'name','message' ,'user_type','user_id'
    ];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    /**
     * build view object this will make view html
     *
     * @return ViewBuilder
     */
    public function getViewBuilder() {
        $builder = new ViewBuilder($this, "rtl");
        $builder->setAddRoute(url('/admin/mailbox/store'))
                ->setEditRoute(url('/admin/mailbox/update') . "/" . $this->id)
                ->setCol(["name" => "id", "label" => __('id'), "editable" => false ])
                ->setCol(["name" => "user_id", "label" => __('user_id'), "editable" => false ])
                ->setCol(["name" => "name", "label" => __('name'), "editable" => false ])
                ->setCol(["name" => "message", "label" => __('message'), "editable" => false ])
                ->setCol(["name" => "user_type", "label" => __('user_type'), "editable" => false ])
                ->setUrl(url('/image/mailbox'))
                ->build();

        return $builder;
    }
}
