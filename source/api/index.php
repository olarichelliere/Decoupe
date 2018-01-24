<?php

require_once __DIR__ . '/loader.php';


error_log('API is starting!');

/**
 * Path Parts:
 * 
 * When user specifies the path as something like:
 *  POST http://localhost/api/items/4/image
 * the following piece of code work as below:
 * 
 * $pathparts will be an array of : array('items', '1', 'image')
 * where:
 * items: is the `resource`
 * 1: is the `id`
 * image: is `subresource`
 * POST: is the `method`
 * 
 */

$baseURL = strtok($_SERVER["REQUEST_URI"],'?');

$api = strtok($baseURL, '/');
$resource = strtok('/');
$id = strtok('/');
$subresource = strtok('/');

$method = $_SERVER['REQUEST_METHOD'];
$requestBody = file_get_contents('php://input');
$requestJSON = json_decode($requestBody);
$requestHeaders = getallheaders();

$filters = $_GET;
$hasFilters = !empty($_GET);


//
// Database Connection
//
$dbhost = $_ENV['RDS_HOSTNAME'];
$dbport = $_ENV['RDS_PORT'];
$dbname = $_ENV['RDS_DB_NAME'];
$username = $_ENV['RDS_USERNAME'];
$password = $_ENV['RDS_PASSWORD'];
$mysqli = new mysqli($dbhost, $username, $password, $dbname, $dbport);

if ($mysqli->connect_errno) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
    error_log("connected");



$userModel = new UserModel($mysqli);
$userController = new UserController($userModel);


try {
    // Make sure if we have any JSON data as input, it's valid, otherwise throw an exception
    if (!empty($requestBody) && json_last_error() != 0){
        throw new Exception(json_last_error_msg(), 400);
    }

    switch ($resource) {
        case 'division':

        $model = new DivisionModel($mysqli);
        $controller = new DivisionController($model);
        
        if ($method == 'POST' && !empty($id) && $subresource == 'image') {
            $data = $controller->upload($id, $_FILES['new_item_image']);

        }  elseif ($method == 'POST') {
            $userController->isAdmin($requestHeaders);
            $data = $controller->create($requestJSON);
            
        } elseif ($method == 'GET' && !empty($id) && $hasFilters) {
            $model = new DataModel($mysqli);
            $controller = new DataController($model);

            $data = $controller->getDivisionDataPerPeriod($id, $filters);
            
        }elseif ($method == 'GET' && !empty($id)) {
            $data = $controller->getOne($id);
            
        } elseif ($method == 'GET') {
            $data = $controller->getAll();
            
        } elseif ($method == 'PUT' && !empty($id)) {
            if($userController->isAdmin($requestHeaders)){
                $data = $controller->update($id, $requestJSON);
            }
            
        } elseif ($method == 'DELETE' && !empty($id)) {
         
            if($userController->isAdmin($requestHeaders)){
                $controller->delete($id);
            }
        }
        break;

        case 'rate':
        $model = new RateModel($mysqli);
        $controller = new RateController($model);
        
        if ($method == 'POST') {           
            if($userController->isAdmin($requestHeaders)){
                $data = $controller->create($requestJSON);
            }
        } elseif ($method == 'GET' && empty($id) && $hasFilters) {
            $data = $controller->getAllWithFilters($filters);

        }elseif ($method == 'GET' && empty($id)) {
            $data = $controller->getAll();
            
        }elseif ($method == 'DELETE' && !empty($id)) {
            if($userController->isAdmin($requestHeaders)){
                $controller->delete($id);
            }
        }
        break;

        case 'thickness':
        $model = new ThicknessModel($mysqli);
        $controller = new ThicknessController($model);
        
        if ($method == 'POST') {
            if($userController->isAdmin($requestHeaders)){
                $data = $controller->create($requestJSON);
            }
        }elseif ($method == 'GET' && !empty($id)) {
            $data = $controller->getOne($id);
        }elseif ($method == 'GET'){
            $data = $controller->getAll();
        }
        break;

        case 'special':
        $model = new SpecialModel($mysqli);
        $controller = new SpecialController($model);

        if($method == 'GET'){
            $data = $controller->getOne($id);
        }
        break;

        case 'material':
        $model = new MaterialModel($mysqli);
        $controller = new MaterialController($model);
        
        if ($method == 'POST') {
            if($userController->isAdmin($requestHeaders)){
                $data = $controller->create($requestJSON);
            }
        } elseif ($method == 'GET' && !empty($id) && $hasFilters) {
            $data = $controller->getAllWithFilters($id, $filters);

        }elseif ($method == 'GET' && !empty($id)) {
            $data = $controller->getOne($id);
        }elseif ($method == 'GET'){
            $data = $controller->getAll();
        }
        break;

        case 'users':
        if ($method == 'POST') {
            $data = $userController->create($requestJSON);   
        }elseif($method == 'GET'){
            $data = $userController->getUserByToken($requestHeaders);
        }
        break;

        case 'login':

        if ($method == 'POST') {
            $data = $userController->login($requestJSON);   
        }elseif ($method == 'DELETE') {
            $userController->logout($requestHeaders);   
        }
        break;
        
        default:
        throw new Exception("$method is not implemented on: $baseURL ", 501); // 501: Not Implemented!
        break;
    }
    
} catch (Exception $e) {
    $data = array('error' => $e->getMessage());
    http_response_code($e->getCode());
}

header("Content-Type: application/json");
echo json_encode($data, JSON_PRETTY_PRINT);