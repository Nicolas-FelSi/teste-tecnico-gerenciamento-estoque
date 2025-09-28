<?php
require __DIR__ . "/../_init.php";
require __DIR__ . "/../../../app/Database.php";
require __DIR__ . "/../../../app/models/Product.php"; 

$input = json_decode(file_get_contents("php://input"), true);
$id = $input['id'];
$name = $input['productName'];
$sku = $input['sku'];
$category = $input['category'];
$price = $input['price'];
$quantity = $input['quantity'];
$supplier = $input['supplier'];
$description = $input['description'];

$userId = $_SESSION['user_id'];

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

