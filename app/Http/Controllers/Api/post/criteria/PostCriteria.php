<?php

namespace App\Http\Controllers\Api\post\criteria;
 

interface PostCriteria  
{
    
    /**
     * fitler the query
     * 
     * @param QueryBuilder 
     * @return QueryBuilder
     */
    public function filter($query);
    
}
