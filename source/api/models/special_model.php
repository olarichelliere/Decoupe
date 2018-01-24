<?php

class SpecialModel extends BaseModel
{

    protected $TableName = 'admin_data';
    protected $ModelName = 'SpecialModel';

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
            "UPDATE {$this->TableName} SET description = '%s', price_per_pound = '%f',pound_per_sqfoot = '%f' WHERE id = %d",
            $payload->thickness,
            $payload->price_per_pound,
            $payload->pound_per_sqfoot,
            $id
        );

        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        }

        return $this->getOne($id);
    }


}
