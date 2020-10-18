<?php

namespace App\Http\Controllers\Api\post\criteria;
 
use DB;

class PriceCriteria implements PostCriteria
{
    
    /**
     * prices of the post
     * 
     * @var String
     */
    private $price1, $price2;
      
    
    /**
     * constructor
     * assign incoming vars with exist
     */
    public function __construct($price1, $price2) {
        $this->price1 = $price1;
        $this->price2 = $price2;
    }
    
    
    /**
     * filter the post between two prices 
     * @param QueryBuilder $query
     * @return QueryBuilder
     */
    public function filter($query) {   
        return $query->whereBetween('price_per_meter', [(int)$this->price1, (int)$this->price2]);
    }
     
}
