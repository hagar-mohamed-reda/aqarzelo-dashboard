<?php

namespace App\Http\Controllers\Api\post\criteria;
 



class CityCriteria implements PostCriteria
{
    
    /**
     * city and area
     * 
     * @var Integer
     */
    private $city_id, $area_id;
      
    
    /**
     * constructor
     * assign incoming vars with exist
     */
    public function __construct($city_id) {
        $this->city_id = $city_id;
    }
    
    
    /**
     * filter with city  
     * @param QueryBuilder $query
     * @return QueryBuilder
     */
    public function filter($query) {
        return $query = $query->where("city_id", $this->city_id);
    }
     
}
