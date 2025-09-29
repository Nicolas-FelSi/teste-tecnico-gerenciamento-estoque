<?php
require __DIR__ . "/../_cors.php";
require __DIR__ . "/../_auth.php";
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

