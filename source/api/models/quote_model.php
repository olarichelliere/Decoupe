<?php

class QuoteModel extends BaseModel
{

    protected $TableName = 'quote';
    protected $ModelName = 'QuoteModel';

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
            "UPDATE {$this->TableName} SET division_id = '%d' WHERE id = %d",
            $payload->division_id,
            $id
        );

        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        }

        return $this->getOne($id);
    }

}
