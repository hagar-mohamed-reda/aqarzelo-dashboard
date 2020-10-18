<?php

namespace App\helper;

class ViewBuilder {

    /**
     * html arributes
     * 
     * @var type array
     */
    public $cols;
    
    
    /**
     * builder object of view builder
     * 
     * @var type 
     */
    private $builder;
    
    
    /**
     * object of model contain values
     *
     * @var type 
     */
    public $object;

    /**
     * ViewBuilder contructor
     * 
     * @param type $object
     */
    public function __construct($object, $direction = "ltr") {
        $this->cols = [];
        $this->builder = [];
        $this->builder["direction"] = $direction;
        $this->object = $object;
    }

    /**
     * set attribute of html input
     * 
     * @param type $array
     * @return \App\helper\ViewBuilder
     */
    public function setCol($options) {
        $array = [
            "show" => isset($options["show"]) ? $options["show"] : true,
            "type" => isset($options["type"]) ? $options["type"] : "text",
            "col" => isset($options["col"]) ? $options["col"] : null,
            "icon" => isset($options["icon"]) ? $options["icon"] : null,
            "data" => isset($options["data"]) ? $options["data"] : [],
            "class" => isset($options["class"]) ? $options["class"] : "",
            "name" => isset($options["name"]) ? $options["name"] : "",
            "editable" => isset($options["editable"]) ? $options["editable"] : true,
            "required" => isset($options["required"]) ? $options["required"] : true,
            "readonly" => isset($options["readonly"]) ? $options["readonly"] : false,
        ];
 

        $array["id"] = isset($options["id"]) ? $options["id"] : $array["name"];
        $array["label"] = isset($options["label"]) ? $options["label"] : $array["name"];
        $array["placeholder"] = isset($options["placeholder"]) ? $options["placeholder"] : $array["label"]; 
        $array["important"] = isset($options["important"]) ? $options["important"] : $array["editable"];
        $array["add"] = isset($options["add"]) ? $options["add"] : $array["editable"];
        $array["edit"] = isset($options["edit"]) ? $options["edit"] : $array["editable"];
        
        // set value
        $name = $array["name"];
        $array["value"] = isset($this->object->$name) ? $this->object->$name : (isset($options['value'])? $options['value'] : null);

        $this->cols[] = $array;
        return $this;
    }
    
    
    /**
     * return add route of add form
     * 
     * @param type string
     * @return \App\helper\ViewBuilder
     */
    public function setAddRoute($route) {
        $this->builder["add_route"] = $route;
        return $this;
    }
    
    
    /**
     * return edit route of edit form 
     * 
     * @param type string
     * @return \App\helper\ViewBuilder
     */
    public function setEditRoute($route) {
        $this->builder["edit_route"] = $route;
        return $this;
    }
    
    
    /**
     * set add title of html modal
     * 
     * @param type string
     * @return \App\helper\ViewBuilder
     */
    public function setAddTitle($title) {
        $this->builder["add_title"] = $title;
        return $this;
    }
    
    
    /**
     * set edit title of html modal
     * 
     * @param type string
     * @return \App\helper\ViewBuilder
     */
    public function setEditTitle($title) {
        $this->builder["edit_title"] = $title;
        return $this;
    }
    
    
    /**
     * set title of main page
     * 
     * @param type string
     * @return \App\helper\ViewBuilder
     */
    public function setPageTitle($title) {
        $this->builder["page_title"] = $title;
        return $this;
    }

    
    /**
     * builder object and return builder array
     * 
     * @return type
     */
    public function build() {
        $this->builder["cols"] = $this->cols;
        return $this->builder;
    }
    
    
    /**
     * set model of view
     * 
     * @param type $model
     * @return \App\helper\ViewBuilder
     */
    public function setModel($model) {
        $this->object = $model;
        return $this;
    }
    
    /**
     * set url of images
     * 
     * @param type string
     * @return \App\helper\ViewBuilder
     */
    public function setUrl($url) {
        $this->builder["url"] = $url;
        return $this;
    }
    
    /**
     * load add view of html inputs
     * 
     * @return type view
     */
    public function loadAddView() { 
        $builder = $this->builder;
        return view("dashboard.viewBuilder.add", compact("builder"));
    }
 
    /**
     * load add view of html inputs
     * 
     * @return type view
     */
    public function loadEditView() { 
        $builder = $this->builder;
        return view("dashboard.viewBuilder.edit", compact("builder"));
    }
}
