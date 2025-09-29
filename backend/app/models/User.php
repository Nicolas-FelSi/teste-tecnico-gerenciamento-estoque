<?php
class User {
  private $pdo;
  public function __construct($pdo) {
    $this->pdo = $pdo;
  }

  public function login($email, $password) {
    $stmt = $this->pdo->prepare("SELECT * FROM usuarios WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && $password === $user['senha']) {
      if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
      }
      session_regenerate_id();
      $_SESSION['user_id'] = $user['id'];
      return true;
    }
    return false;
  }

  public function logout() {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }

    $_SESSION = [];

    $destroyed = session_destroy();

    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 3600, '/');
    }

    return $destroyed;
  }
}