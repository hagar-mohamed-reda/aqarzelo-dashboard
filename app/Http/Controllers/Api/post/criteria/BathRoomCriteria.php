<?php

namespace App\Http\Controllers\Api\post\criteria;
 

class BathRoomCriteria implements PostCriteria
{
    
    /**
     * number of the bathroom in the post
     * 
     * @var String
     */
    private $number;
      
    
    /**
     * constructor
     * assign incoming vars with exist
     */
    public function __construct($number) {
        $this->number = $number;
    }
    
    
    /**
     * filter with post type
     * @param QueryBuilder $query
     * @return QueryBuilder
     */
    public function filter($query) { 
        return $query->where("bathroom_number", ">=", $this->number); 
    }
     
}
