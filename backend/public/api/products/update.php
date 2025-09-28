<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
  http_response_code(200);
  exit;
}

require __DIR__ . "/../../../app/Database.php";
require __DIR__ . "/../../../app/models/Product.php"; 

$input = json_decode(file_get_contents("php://input"), true);
$id = $input['id'];
$name = $input['productName'];
$userId = $input['userId'];
$sku = $input['sku'];
$category = $input['category'];
$price = $input['price'];
$quantity = $input['quantity'];
$supplier = $input['supplier'];
$description = $input['description'];

$pdo = Database::getInstance();
$product = new Product($pdo);
$result = $product->update($userId, $name, $sku, $category, $price, $quantity, $supplier, $description, $id); 

if ($result) {
  http_response_code(201);
  echo json_encode([
    'success'=>true, 
    'message'=> 'Produto atualizado com sucesso.',
  ], JSON_UNESCAPED_UNICODE);
  exit;
} else {
  http_response_code(400);
  echo json_encode(['success'=>false, 'message'=> 'Erro ao atualizar produto do estoque.'], JSON_UNESCAPED_UNICODE);
  exit;
}

