<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
  http_response_code(200);
  exit;
}

require __DIR__ . "/../../../app/Database.php";
require __DIR__ . "/../../../app/models/Product.php"; 

$pdo = Database::getInstance();
$product = new Product($pdo);
$result = $product->all(); 

if ($result) {
  http_response_code(200);
  echo json_encode([
    'success'=>true, 
    'data'=>$result
  ], JSON_UNESCAPED_UNICODE);
  exit;
} else {
  http_response_code(404);
  echo json_encode(['success'=>false, 'message'=> 'Erro ao listar produtos do estoque.'], JSON_UNESCAPED_UNICODE);
  exit;
}

