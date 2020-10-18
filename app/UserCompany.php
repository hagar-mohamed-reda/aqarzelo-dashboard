<?php

namespace App;


use App\helper\ViewBuilder;

class UserCompany  extends User
{


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


        $builder->setAddRoute(url('/company/user/store'))
                ->setEditRoute(url('/company/user/update') . "/" . $this->id)
                ->setCol(["name" => "id", "label" => __('id'), "editable" => false ])
                ->setCol(["name" => "name", "label" => __('name')])
                ->setCol(["name" => "email", "label" => __('email')])
                ->setCol(["name" => "password", "label" => __('password'), "type" => "password"])
                ->setCol(["name" => "phone", "label" => __('phone'), "type" => "phone"])
                ->setCol(["name" => "photo", "label" => __('photo'), "type" => "image", "required"=> false])
                ->setCol(["name" => "address", "label" => __('address'), "type" => "text", "required"=> false])
                ->setUrl(AQARZELO_PUBLIC_URL . '/images/users')
                ->build();

        return $builder;
    }
}
