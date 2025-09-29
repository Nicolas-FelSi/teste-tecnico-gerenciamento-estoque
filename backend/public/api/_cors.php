<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://127.0.0.1:81");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
  http_response_code(200);
  exit;
}