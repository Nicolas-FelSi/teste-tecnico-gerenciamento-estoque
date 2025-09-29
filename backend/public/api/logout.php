<?php
require __DIR__ . "/../api/_cors.php";
require __DIR__ . "/../api/_auth.php";
require __DIR__ . "/../../app/Database.php";
require __DIR__ . "/../../app/models/User.php"; 

$pdo = Database::getInstance();
$user = new User($pdo);
$result = $user->logout(); 

if ($result) {
  http_response_code(200);
  echo json_encode([
    'success'=>true, 
    'data'=>$result
  ], JSON_UNESCAPED_UNICODE);
  exit;
} else {
  http_response_code(404);
  echo json_encode(['success'=>false, 'message'=> 'Erro fazer logout.'], JSON_UNESCAPED_UNICODE);
  exit;
}

