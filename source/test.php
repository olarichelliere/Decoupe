<?php





//
// Database Connection
//
$mysqli = new mysqli('sql5c0b.megasqlservers.com', 'dblavalcom194225', 'aloy5262$', 'decoupe_dblavalcom194225');
if ($mysqli->connect_errno) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
    echo "connected";

    $items = array();
    $query = "SELECT * FROM thickness_def";
    $result = $this->db_connection->query($query);

    error_log("Generated Query is: $query");
    
    if (!$result) {
        throw new Exception("Database error: {$this->db_connection->error}", 500);
    }
    
    while ($item = $result->fetch_object($this->ModelName)) {
        $items[] = $item;
    }
    echo "before last line";
    var_dump($items);

