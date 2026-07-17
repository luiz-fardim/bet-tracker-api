# 🎯 Investment Tracker API

<p align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0902?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

<p align="center">
  <strong>API REST para gerenciamento e organização de investimentos pessoais</strong>, construída com NestJS, TypeORM e PostgreSQL.
</p>

<p align="center">
  <i>Uma API para registrar operações de compra e venda, calcular lucro/prejuízo e acompanhar o desempenho do portfólio em tempo real. 🚀</i>
</p>

---

## 💡 Sobre o projeto

O **Investment Tracker** nasceu da necessidade de organizar operações financeiras com clareza e segurança. A API permite registrar investimentos, calcular lucro/prejuízo automaticamente e ter uma visão clara do desempenho ao longo do tempo.

O que começou como uma ferramenta simples está crescendo para se tornar um produto completo, com autenticação, múltiplos usuários e, em breve, um front-end com dashboard e gráficos.

---

## 📸 Preview

<img src="./assets/Captura de tela 2026-06-25 223501.png" width="800">

---

## 🚀 Tecnologias

- ⚡ NestJS
- 🟦 TypeScript
- 🐘 PostgreSQL
- 🔗 TypeORM
- 🔐 JWT + Guards
- 🐳 Docker & Docker Compose
- ✅ class-validator
- 🔒 ValidationPipe Global
- 🛡️ RBAC — Role Based Access Control
- 📄 Swagger — Documentação interativa

---

## 📂 Estrutura do Projeto

```text
src
├── auth
│   ├── dto
│   ├── entities
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
│
├── transactions
│   ├── dto
│   ├── entities
│   ├── transactions.controller.ts
│   ├── transactions.service.ts
│   └── transactions.module.ts
│
├── guards
│   ├── auth
│   │   └── auth.guard.ts
│   └── authorization
│       ├── roles.decorator.ts
│       └── roles.guard.ts
│
├── users
│   ├── dto
│   ├── entities
│   ├── users.controller.ts
│   └── users.service.ts
│
├── enum
│   ├── assetType.enum.ts
│   ├── betStatus.enum.ts
│   └── transactionStatus.enum.ts
│   └── role.enum.ts
│
├── app.module.ts
└── main.ts
```

---

## ✨ Funcionalidades

### 🔐 Autenticação & Usuários
- ✅ Cadastro de usuários com hash de senha (bcrypt)
- ✅ Login com JWT
- ✅ Proteção de rotas com Guards
- ✅ RBAC — controle de acesso por roles (admin/user)
- ✅ Relação usuário → transactions (cada usuário vê só as suas próprias operações)

### 📈 Transactions
- ✅ Cadastro de operações de investimento
- ✅ Listagem paginada das operações do usuário autenticado
- ✅ Filtro por status (OPEN, CLOSED)
- ✅ Busca por ID
- ✅ Atualização do status e preço de venda
- ✅ Remoção de operações
- ✅ Cálculo automático de lucro/prejuízo
- ✅ Resumo de investimento total e ROI
- ✅ Validação global de dados

### 📄 Documentação
- ✅ Swagger com autenticação Bearer
- ✅ DTOs documentados com exemplos

---

## 📊 Regras de Negócio

Cada transação possui:

- Nome do ativo
- Tipo do ativo
- Corretora/operação
- Quantidade
- Preço de compra
- Preço de venda (quando fechado)
- Taxas
- Status

### Resultado da operação

| Status    | Resultado |
| --------- | --------- |
| `OPEN`    | Aguardando fechamento |
| `CLOSED`  | Lucro = `(sellPrice - buyPrice) × quantity - fees` |

### Roles de usuário

| Role    | Permissões                          |
| ------- | ------------------------------------ |
| `user`  | CRUD nas próprias transactions        |
| `admin` | Acesso a recursos administrativos      |

---

## 🌐 Deploy

A API está disponível em produção:
https://bet-tracker-api-ynry.onrender.com/

Documentação Swagger:
https://bet-tracker-api-ynry.onrender.com/api

## ⚙️ Como executar

### Pré-requisitos

- Node.js 20+
- Docker
- Docker Compose

### Clone o projeto

```bash
git clone https://github.com/seu-usuario/bet-tracker.git
cd bet-tracker
```

### Instale as dependências

```bash
npm install
```

### Configure as variáveis de ambiente

Crie um arquivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=bet_tracker

JWT_SECRET=sua_chave_secreta
```

### Suba o banco

```bash
docker compose up -d
```

### Execute a aplicação

```bash
npm run start:dev
```

A API estará disponível em:

```
http://localhost:3000
```

A documentação Swagger estará em:

```
http://localhost:3000/api
```

---

## 📡 Endpoints

### Autenticação

| Método | Endpoint          | Descrição                 |
| ------ | ----------------- | -------------------------- |
| POST   | `/auth/register`  | Criar conta de usuário    |
| POST   | `/auth/login`     | Login e geração de token  |

### Transactions — requer autenticação

| Método | Endpoint        | Descrição                                        |
| ------ | --------------- | ------------------------------------------------- |
| POST   | `/transactions`         | Criar uma operação de investimento |
| GET    | `/transactions`         | Listar operações com paginação e filtro por status |
| GET    | `/transactions/summary` | Retorna investimento total, lucro e ROI |
| GET    | `/transactions/:id`     | Buscar operação por ID |
| PATCH  | `/transactions/:id`     | Atualizar status/preço de venda da operação |
| DELETE | `/transactions/:id`     | Remover operação |

### Usuários — requer autenticação

| Método | Endpoint       | Descrição                          |
| ------ | -------------- | ----------------------------------- |
| GET    | `/users`       | Listar usuários (somente admin)     |
| GET    | `/users/:id`   | Buscar usuário por ID               |
| PATCH  | `/users/:id`   | Atualizar usuário                   |
| DELETE | `/users/:id`   | Remover usuário (somente admin)     |

---

## 📥 Exemplo de criação

```http
POST /transactions
Authorization: Bearer <token>
```

```json
{
  "assetName": "PETR4",
  "assetType": "STOCK",
  "broker": "Nubank",
  "quantity": 10,
  "buyPrice": 20.5,
  "fees": 0
}
```

## 📤 Exemplo de atualização

```http
PATCH /transactions/:id
Authorization: Bearer <token>
```

```json
{
  "status": "CLOSED",
  "sellPrice": 23.0
}
```

## 📈 Exemplo de resposta

```json
{
  "id": "221cf8df-8584-4c45-a09e-214e7d684d61",
  "assetName": "PETR4",
  "assetType": "STOCK",
  "broker": "Nubank",
  "quantity": 10,
  "buyPrice": 20.5,
  "sellPrice": 23.0,
  "fees": 0,
  "status": "CLOSED",
  "profit": 25.0,
  "createdAt": "2026-06-25T22:35:01.533Z",
  "updatedAt": "2026-06-25T22:35:01.533Z"
}
```

---

## 🔮 Roadmap

### 📈 Melhorias na API
- [ ] Refresh Token
- [ ] Logout
- [ ] OAuth2 (Google)
- [ ] Rate limiting nas rotas de autenticação
- [ ] Logs com Winston ou Pino
- [ ] Testes unitários
- [ ] Estatísticas avançadas (ROI, sequência de vitórias, etc.)
- [ ] Histórico mensal
- [ ] Export CSV e PDF

### 🔗 Integrações
- [ ] API de cotações em tempo real
- [ ] Atualização automática do preço de fechamento
- [ ] BullMQ + Redis — filas para notificações e relatórios
- [ ] Telegram Bot — notificar quando uma operação fechar com lucro ou prejuízo
- [ ] Nodemailer — resumo semanal por email

### 💻 Front-end
- [ ] Dashboard em React ou Next.js
- [ ] Tela de login e cadastro
- [ ] Perfil do usuário
- [ ] Gráficos de lucro/prejuízo
- [ ] Estatísticas em tempo real

### 🏗️ Infraestrutura
- [ ] Deploy no Railway ou VPS com Docker
- [ ] CI/CD com GitHub Actions

---

## 🧪 Testes

```bash
npm run test
```

---

## 📝 Licença

Este projeto está sob a licença **MIT**.

---

## 👨‍💻 Autor

Desenvolvido por **Luiz**, durante os estudos de Backend com **NestJS**, **PostgreSQL**, **Docker** e boas práticas de desenvolvimento — com o objetivo de ajudar pessoas a ter mais controle sobre seus investimentos.

Sugestões, ideias ou vontade de contribuir? Fique à vontade para abrir uma **Issue** ou enviar um **Pull Request**. 🚀