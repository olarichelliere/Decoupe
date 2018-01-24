<?php

class RateModel extends BaseModel
{

    protected $TableName = 'rate_data';
    protected $ModelName = 'RateModel';

/*
    public function getFilteredByTXT($searchTXT)
    {
        $items = array();
        $query = "SELECT *, MATCH(name,descriptionShort,descriptionLong,colour) AGAINST 
                ('{$searchTXT}' IN NATURAL LANGUAGE MODE) AS score 
                FROM {$this->TableName} 
                WHERE MATCH(name,descriptionShort,descriptionLong,colour) AGAINST 
                ('{$searchTXT}' IN NATURAL LANGUAGE MODE)";

        error_log("QUERY: $query");
        
        $result = $this->db_connection->query($query);

        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        }
        
        while ($item = $result->fetch_object($this->ModelName)) {
            $items[] = $item;
        }

        return $items;
    }
*/
    public function update($id, $payload)
    {
        $query = sprintf(
            "UPDATE {$this->TableName} SET thickness = '%s', thk_decimal = '%f' WHERE id = %d",
            $payload->thickness,
            $payload->thk_decimal,
            $id
        );

        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        }

        return $this->getOne($id);
    }

        /**
     * getAll will retrieve all the records from the databse from $TableName
     */
    public function getAll1()
    {
        $items = array();
        $query = "SELECT * FROM {$this->TableName} ORDER BY thk_decimal DESC";
        $result = $this->db_connection->query($query);

        error_log("Generated Query is: $query");
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        }
        
        while ($item = $result->fetch_object($this->ModelName)) {
            $items[] = $item;
        }

        return $items;
    }
 
    public function getRateSpeed($thicknessId,$materialId){

        
        $query = sprintf(
            "SELECT  rate_data.feed_rate,rate_data.defonce,thickness_def.thk_decimal, material.price_per_pound, material.pound_per_sqfoot 
             FROM {$this->TableName} 
             LEFT JOIN thickness_def ON thickness_def.id = rate_data.thickness_id 
             LEFT JOIN material ON material.id = rate_data.material_id 
             WHERE thickness_id = '%d' AND material_id = '%d'",
            $thicknessId,
            $materialId
        );

        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        }

        $rate = $result->fetch_object($this->ModelName);
        return $rate; 
    }
}
