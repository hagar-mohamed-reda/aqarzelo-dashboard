<?php

namespace App\Http\Controllers\Api\post\criteria;





class TypeCriteria implements PostCriteria
{
    
    /**
     * type of the post ['rent', 'sell']
     * 
     * @var String
     */
    private $type;
      
    
    /**
     * constructor
     * assign incoming vars with exist
     */
    public function __construct($type) {
        $this->type = $type;
    }
    
    
    /**
     * filter with post type
     * @param QueryBuilder $query
     * @return QueryBuilder
     */
    public function filter($query) { 
        return $query->where("type", $this->type); 
    }
     
}
