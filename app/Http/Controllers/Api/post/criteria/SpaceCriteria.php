<?php

namespace App\Http\Controllers\Api\post\criteria;
 
use DB;

class SpaceCriteria implements PostCriteria
{
    
    /**
     * spaces of the post
     * 
     * @var String
     */
    private $space1, $space2;
      
    
    /**
     * constructor
     * assign incoming vars with exist
     */
    public function __construct($space1, $space2) {
        $this->space1 = $space1;
        $this->space2 = $space2;
    }
    
    
    /**
     * filter the post between two spaces 
     * @param QueryBuilder $query
     * @return QueryBuilder
     */
    public function filter($query) {   
        return $query->whereBetween('space', [(int)$this->space1, (int)$this->space2]);
    }
     
}
