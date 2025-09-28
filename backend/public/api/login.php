<?php
require __DIR__ . "_init.php";
require __DIR__ . "/../../app/Database.php";
require __DIR__ . "/../../app/models/User.php"; 

$input = json_decode(file_get_contents("php://input"), true);
$email = $input['email'];
$password = $input['password'];

if (!$email || !$password) {
  http_response_code(400);
  echo json_encode(['success'=>false, 'message' => 'Os campos precisam estar preenchidos.']);
  exit;
}

$pdo = Database::getInstance();
$user = new User($pdo);

if ($user->login($email, $password)) {
  http_response_code(200);
  echo json_encode([
    'success'=>true, 
    'message'=> 'Usuário logado com sucesso.',
    'user_id'=> $_SESSION['user_id']
  ], JSON_UNESCAPED_UNICODE);
  exit;
} else {
  http_response_code(401);
  echo json_encode(['success'=>false, 'message'=> 'Credenciais inválidas. Verifique usuário e senha.'], JSON_UNESCAPED_UNICODE);
  exit;
}
