<?php

class DivisionModel extends BaseModel
{
    public $id;

    protected $TableName = 'division';
    protected $ModelName = 'DivisionModel';

    

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
            "UPDATE {$this->TableName} SET division = '%s', div_address = '%s', city = '%s', postal = '%s', manager = '%s', tel = '%s', email = '%s' WHERE id = %d",
            $payload->division,
            $payload->div_address,
            $payload->city,
            $payload->postal,
            $payload->manager,
            $payload->tel,
            $payload->email,
            $id
        );

        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        }

        return $this->getOne($id);
    }

    /**
     * Updates the filename info for the specified item
     */
    public function updateImage($id, $filename) 
    {
        error_log("update Image: $id : $filename");
        return $this->updateFieldById($id, 'image', $filename);
    }

    /**
     * getFilteredItems returns the list of items based on the parameters specified
     */
    public function getFilteredItems($categoryId) {
        $join_clause  = 'JOIN items_categories ON items.id = items_categories.itemId';
        $where_clause = "WHERE items_categories.categoryId = {$categoryId}";

        return $this->getFiltered($join_clause, $where_clause);
    }
}
