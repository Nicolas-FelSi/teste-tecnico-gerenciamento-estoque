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

