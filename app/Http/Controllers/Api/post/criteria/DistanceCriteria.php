<?php

namespace App\Http\Controllers\Api\post\criteria;
 



class DistanceCriteria implements PostCriteria
{
    
    /**
     * lat and lng of google map
     * 
     * @var String
     */
    private $lat, $lng;
     
    
    /**
     * scope distance of the search in kilometers
     * 
     * @var integer
     */
    public static $SCOPE_DISTANCE = 5;
    
    
    /**
     * constructor of the class
     * assign lat lng of user with exist
     */
    public function __construct($lat, $lng) {
        $this->lat = $lat;
        $this->lng = $lng; 
    }
    
    
    /**
     * filter with lat lng distance
     * 
     * @param QueryBuilder $query
     * @return QueryBuilder
     */
    public function filter($query) {  
        // circle of radius of earth in kilometer
        $circleRadiusKilometer = 6371; 
        
        $haversine = " (" . $circleRadiusKilometer . " * acos(cos(radians(" . $this->lat . ")) 
                    * cos(radians(`lat`)) 
                    * cos(radians(`lng`) 
                    - radians(" . $this->lng . ")) 
                    + sin(radians(" . $this->lat . ")) 
                    * sin(radians(`lat`))))";

        return $query->selectRaw("{$haversine} AS distance")
            ->whereRaw("{$haversine} < ?", self::$SCOPE_DISTANCE);  
    }
     
}
