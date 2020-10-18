<?php

namespace App\Http\Controllers\Api\post\criteria;
 



class AreaCriteria implements PostCriteria
{
    
    /**
     * area id
     * 
     * @var String
     */
    private  $area_id;
      
    
    /**
     * constructor
     * assign incoming vars with exist
     */
    public function __construct($area_id) { 
        $this->area_id = $area_id; 
    }
    
    
    /**
     * filter with city and area
     * @param QueryBuilder $query
     * @return QueryBuilder
     */
    public function filter($query) { 
        return $query = $query->where("area_id", $this->area_id);  
    }
     
}
