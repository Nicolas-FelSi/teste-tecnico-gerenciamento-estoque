<?php
class Product {
  private $pdo;
  public function __construct($pdo) {
    $this->pdo = $pdo;
  }

  public function all() {
    return $this->pdo->query("SELECT * FROM produtos ORDER BY id DESC")->fetchAll();
  }

  public function create($userId,$name,$sku,$category,$price,$quantity,$supplier,$description) {
    $sql = "INSERT INTO produtos (usuario_id, nome, sku, categoria, preco, quantidade, fornecedor, descricao) VALUES (?,?,?,?,?,?,?,?)";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute([$userId,$name,$sku,$category,$price,$quantity,$supplier,$description]);
    return $this->pdo->lastInsertId();
  }

  public function update($userId, $name,$sku,$category,$price,$quantity,$supplier,$description, $id) {
    $stmt = $this->pdo->prepare("UPDATE produtos SET usuario_id = ?, nome = ?, sku = ?,categoria = ?,preco = ?,quantidade = ?,fornecedor = ?,descricao = ? WHERE id = ?");
    return $stmt->execute([$userId, $name,$sku,$category,$price,$quantity,$supplier,$description, $id]);
  }

  public function delete($id) {
    $stmt = $this->pdo->prepare("DELETE FROM produtos WHERE id = ?");
    return $stmt->execute([$id]);
  }
}