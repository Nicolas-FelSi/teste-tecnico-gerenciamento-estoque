<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
  http_response_code(200);
  exit;
}

if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (empty($_SESSION['user_id'])) {
  http_response_code(401);
  echo json_encode(['success'=>false,'message'=>'Não autorizado.']);
  exit;
}
