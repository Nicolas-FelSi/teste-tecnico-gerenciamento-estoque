# Sistema de Gerenciamento de Estoque – Teste Técnico

Projeto desenvolvido como parte do **Teste Técnico para Estágio – Innovation Class (Magento)**.  
O objetivo é implementar um sistema de **login de usuários** e **gerenciamento de produtos**, utilizando:

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP
- **Banco de Dados:** MySQL

---

## Funcionalidades

### Login
- Tela centralizada de login
- Validação de usuário e senha
- Exibição de mensagens de erro em caso de credenciais inválidas
- Controle de sessão (PHP Session)

### Gerenciamento de Produtos
- Listagem de produtos em tabela (nome, quantidade, preço, ações)
- Adicionar produto (formulário/modal)
- Editar produto (formulário/modal pré-preenchido)
- Excluir produto (confirmação antes de deletar/modal)
- Logout

### Diferenciais implementados
- Estrutura em **PHP Orientado a Objetos** (Database, User, Product)
- Organização em pastas (`frontend/`, `backend/`, `app/`, `models/`, `api`, etc)
- Layout **fiel o máximo que consegui até o momento ao protótipo**
- **Responsividade** para dispositivos móveis
- Uso de **prepared statements**

---

## Estrutura de Pastas

backend/
├─ app/models/ - Classes OOP (Database, User, Product)
├─ public/api/ - Endpoints da API
│ ├─ products/
│ │ ├─ create.php
│ │ ├─ read.php
│ │ ├─ update.php
│ │ └─ delete.php
│ └─ login.php
└─ sql/ - Scripts SQL

frontend/
├─ css/ - Estilos (login e dashboard)
├─ js/ - Lógica (login, dashboard, modais)
├─ images/ - Ícones
├─ login.html - Tela de login
└─ dashboard.html - Tela de gerenciamento

## Instalação

### 1. Banco de Dados
1. Abra o phpMyAdmin no XAMPP.  
2. Crie um banco chamado `teste_db`.  
3. Importe o arquivo `backend/sql/gerenciamento_estoque.sql`.  

### 2. Backend (XAMPP)
- Coloque o projeto em `C:\xampp\htdocs\`
- Inicie **Apache** e **MySQL** no painel do XAMPP.
- Endpoints ficam acessíveis em: http://localhost/teste-tecnico-gerenciamento-estoque/backend/public/api/products/

### 3. Frontend (Live Server)
- Abra `frontend/login.html` com o Live Server.
- O sistema rodará em algo como: http://127.0.0.1:5500/frontend/login.html

> Como o frontend e backend estão em portas diferentes, foi habilitado **CORS** nos arquivos PHP.

---

## Usuário de Teste

E-mail: admin@gmail.com
Senha: 123456

---

## Segurança e Boas Práticas
- Código organizado em **OOP** (`Database`, `User`, `Product`)
- Queries com **Prepared Statements (PDO)**
- Controle de sessão (`$_SESSION`)
- *Obs.:* Neste teste, as senhas foram salvas em texto puro para simplificação.  
  Em produção usaria `password_hash()` e `password_verify()`.

---

## Possíveis Melhorias
- Utilizar `password_hash` para maior segurança
- Adicionar upload de imagens para produtos
- Criar paginação na listagem
- Implementar testes automatizados

---

## 👨‍💻 Autor
Nicolas Felipe da Silva – Candidato ao Estágio Innovation Class 15 – Magento
