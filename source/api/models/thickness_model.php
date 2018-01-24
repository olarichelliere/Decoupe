<?php

class ThicknessModel extends BaseModel
{

    protected $TableName = 'thickness_def';
    protected $ModelName = 'ThicknessModel';

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
    public function getAll()
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
}
