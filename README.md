# 🎯 Bet Tracker API

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
  <strong>API REST para gerenciamento e organização de apostas esportivas</strong>, construída com NestJS, TypeORM e PostgreSQL.
</p>

<p align="center">
  <i>Um projeto que começou pequeno — pra ajudar meu pai a organizar as apostas dele — e que hoje eu quero transformar em algo que possa ajudar outras pessoas também. 🚀</i>
</p>

---

## 💡 Sobre o projeto

O **Bet Tracker** nasceu de um problema real: meu pai fazia apostas esportivas e não tinha nenhum controle sobre quanto ganhava, quanto perdia, ou se estava realmente saindo no lucro. Criei essa API pra resolver isso — registrar apostas, calcular lucro/prejuízo automaticamente e dar uma visão clara do desempenho ao longo do tempo.

O que começou como uma ferramenta simples está crescendo pra virar um produto completo, com autenticação, múltiplos usuários e, em breve, um front-end com dashboard e gráficos.

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
├── bets
│   ├── dto
│   ├── entities
│   ├── bets.controller.ts
│   ├── bets.service.ts
│   └── bets.module.ts
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
│   ├── betStatus.enum.ts
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
- ✅ Relação usuário → apostas (cada usuário vê só as próprias apostas)

### 🎲 Apostas
- ✅ Cadastro de apostas
- ✅ Listagem paginada das apostas do usuário autenticado
- ✅ Filtro por status (pending, won, lost)
- ✅ Busca por ID
- ✅ Atualização do resultado da aposta
- ✅ Remoção de apostas
- ✅ Cálculo automático de lucro/prejuízo
- ✅ Resumo do lucro total acumulado
- ✅ Validação global de dados

### 📄 Documentação
- ✅ Swagger com autenticação Bearer
- ✅ DTOs documentados com exemplos

---

## 📊 Regras de Negócio

Cada aposta possui:

- Time da casa
- Time visitante
- Mercado
- Odd
- Valor apostado
- Status

### Resultado da aposta

| Status    | Resultado                       |
| --------- | -------------------------------- |
| `pending` | Aguardando resultado             |
| `won`     | Lucro = `(odd × valor) - valor`  |
| `lost`    | Prejuízo = `-valor`              |

### Roles de usuário

| Role    | Permissões                          |
| ------- | ------------------------------------ |
| `user`  | CRUD nas próprias apostas            |
| `admin` | Acesso a recursos administrativos    |

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

### Apostas — requer autenticação

| Método | Endpoint        | Descrição                                        |
| ------ | --------------- | ------------------------------------------------- |
| POST   | `/bets`         | Criar aposta                                      |
| GET    | `/bets`         | Listar apostas com paginação e filtro por status  |
| GET    | `/bets/summary` | Retorna o lucro total acumulado                   |
| GET    | `/bets/:id`     | Buscar aposta por ID                              |
| PATCH  | `/bets/:id`     | Atualizar resultado da aposta                     |
| DELETE | `/bets/:id`     | Remover aposta                                    |

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
POST /bets
Authorization: Bearer <token>
```

```json
{
  "homeTeam": "Flamengo",
  "visitingTeam": "Corinthians",
  "market": "Resultado Final",
  "odd": 2.5,
  "value": 50
}
```

## 📤 Exemplo de atualização

```http
PATCH /bets/:id
Authorization: Bearer <token>
```

```json
{
  "status": "won"
}
```

## 📈 Exemplo de resposta

```json
{
  "id": "221cf8df-8584-4c45-a09e-214e7d684d61",
  "homeTeam": "Flamengo",
  "visitingTeam": "Corinthians",
  "market": "Resultado Final",
  "odd": 2.5,
  "value": 50,
  "status": "won",
  "profit": 75.00,
  "createdAt": "2026-06-25T22:35:01.533Z"
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
- [ ] API-Football — times, competições e resultados em tempo real
- [ ] Atualização automática do resultado quando o jogo terminar
- [ ] BullMQ + Redis — filas para notificações e relatórios
- [ ] Telegram Bot — notificar quando aposta for ganha ou perdida
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

Desenvolvido por **Luiz**, durante os estudos de Backend com **NestJS**, **PostgreSQL**, **Docker** e boas práticas de desenvolvimento — e com o objetivo real de ajudar meu pai (e, no futuro, outras pessoas) a ter mais controle sobre suas apostas.

Sugestões, ideias ou vontade de contribuir? Fique à vontade para abrir uma **Issue** ou enviar um **Pull Request**. 🚀