<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
  http_response_code(200);
  exit;
}

require __DIR__ . "/../../../app/Database.php";
require __DIR__ . "/../../../app/models/Product.php"; 

$input = json_decode(file_get_contents("php://input"), true);
$id = $input['id'];

$pdo = Database::getInstance();
$product = new Product($pdo);
$result = $product->delete($id); 

if ($result) {
  http_response_code(200);
  echo json_encode([
    'success'=>true, 
    'message'=> 'Produto excluído com sucesso.',
  ], JSON_UNESCAPED_UNICODE);
  exit;
} else {
  http_response_code(400);
  echo json_encode(['success'=>false, 'message'=> 'Erro ao excluir produto do estoque.'], JSON_UNESCAPED_UNICODE);
  exit;
}

