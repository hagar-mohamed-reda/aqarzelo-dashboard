<?php

namespace App\Http\Controllers\Api\post\criteria;
 



class BedRoomCriteria implements PostCriteria
{
    
    /**
     * number of the bedroom in the post
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
        return $query->where("bedroom_number", ">=", $this->number); 
    }
     
}
