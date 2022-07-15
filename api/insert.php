<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

 
if ($_SERVER['REQUEST_METHOD'] !== 'POST') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request!.Only POST method is allowed',
    ]);
    exit;
endif;
 
require 'db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();
 
$data = json_decode(file_get_contents("php://input"));


// //print_r($data);

// $hobbies = $data->hobbyField;
// //print_r($hobbies);
// $hobbies_list = '';
// foreach ($hobbies as $hobby) {
//     $hobbies_list .= $hobby.',';
//  } 

if (!isset($data->id) || !isset($data->number) || !isset($data->amount)) :
 
    echo json_encode([
        'success' => 0,
        'message' => 'Please enter compulsory fileds |  First Name, Last Name and Email',
    ]);
    exit;
 
elseif (empty(trim($data->id)) || empty(trim($data->number)) || empty(trim($data->amount))) :
 
    echo json_encode([
        'success' => 0,
        'message' => 'Field cannot be empty. Please fill all the fields.',
    ]);
    exit;
 
endif;
 
try {
 
    $id = htmlspecialchars(trim($data->id));
    $number = htmlspecialchars(trim($data->number));
    $amount = htmlspecialchars(trim($data->amount));

 
    $query = "INSERT INTO `policies`(
    id,
    number,
    amount
    ) 
    VALUES(
    :id,
    :number,
    :amount
    )";
 
    $stmt = $conn->prepare($query);
 
    $stmt->bindValue(':id', $id, PDO::PARAM_STR);
    $stmt->bindValue(':number', $number, PDO::PARAM_STR);
    $stmt->bindValue(':amount', $amount, PDO::PARAM_STR);
    

    if ($stmt->execute()) {
 
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data Inserted Successfully.'
        ]);
        exit;
    }
    
    echo json_encode([
        'success' => 0,
        'message' => 'There is some problem in data inserting'
    ]);
    exit;
 
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
