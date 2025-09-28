<?php
class Database {
  private static $instance = null;
  private $pdo;
  
  private function __construct() {
    $host = getenv('DB_HOST') ?: "localhost";
    $user = getenv('DB_USER') ?: "root";
    $pass = getenv('DB_PASS') ?: "";
    $db = getenv('DB_NAME') ?: "gerenciamento_estoque";
    $port = getenv('DB_PORT') ?: 3306;
    
    try {
      $this->pdo = new PDO("mysql:host={$host};port={$port};dbname={$db};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
      ]);
    } catch (PDOException $e) {
      error_log($e->getMessage());
      http_response_code(500);
      echo json_encode(['erro' => "Conexão com o banco falhou."]);
      exit;
    }
  }

  public static function getInstance() {
    if (self::$instance === null) {
      self::$instance = new Database();
    }
    return self::$instance->pdo;
  }
}

