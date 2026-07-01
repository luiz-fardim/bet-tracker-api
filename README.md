# 🎯 Bet Tracker API

<p align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0902?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
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
│   └── auth
│       └── auth.guard.ts
│
├── users
│   ├── dto
│   ├── entities
│   ├── users.controller.ts
│   └── users.service.ts
│
├── app.module.ts
└── main.ts
```

---

## ✨ Funcionalidades

### 🔐 Autenticação & Usuários
- ✅ Cadastro de usuários
- ✅ Login com JWT
- ✅ Proteção de rotas com Guards
- ✅ Relação usuário → apostas

### 🎲 Apostas
- ✅ Cadastro de apostas
- ✅ Listagem de todas as apostas
- ✅ Busca por ID
- ✅ Atualização do resultado da aposta
- ✅ Remoção de apostas
- ✅ Cálculo automático de lucro/prejuízo
- ✅ Resumo do lucro total acumulado
- ✅ Validação global de dados

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

---

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

```text
http://localhost:3000
```

---

## 📡 Endpoints

### Autenticação

| Método | Endpoint      | Descrição                |
| ------ | ------------- | -------------------------- |
| POST   | `/auth/register` | Criar conta de usuário  |
| POST   | `/auth/login`     | Login e geração de token |

### Apostas

| Método | Endpoint        | Descrição                       |
| ------ | --------------- | -------------------------------- |
| POST   | `/bets`         | Criar aposta                     |
| GET    | `/bets`         | Listar apostas                   |
| GET    | `/bets/:id`     | Buscar aposta por ID             |
| PATCH  | `/bets/:id`     | Atualizar resultado              |
| DELETE | `/bets/:id`     | Remover aposta                   |
| GET    | `/bets/summary` | Retorna o lucro total acumulado  |

---

## 📥 Exemplo de criação

```http
POST /bets
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
```

```json
{
  "status": "won"
}
```

## 📈 Exemplo de resposta

```json
{
  "id": 1,
  "homeTeam": "Flamengo",
  "visitingTeam": "Corinthians",
  "market": "Resultado Final",
  "odd": 2.5,
  "value": 50,
  "status": "won",
  "profit": 75
}
```

---

## 🔮 Roadmap

### 📈 Melhorias na API
- [ ] Refresh Token
- [ ] Logout
- [ ] OAuth2 (Google)
- [ ] Paginação
- [ ] Filtros por status
- [ ] Ordenação
- [ ] Estatísticas avançadas (ROI, sequência de vitórias, etc.)
- [ ] Histórico mensal

### 💻 Front-end
- [ ] Dashboard em React ou Next.js
- [ ] Tela de login e cadastro
- [ ] Perfil do usuário
- [ ] Gráficos de lucro/prejuízo
- [ ] Estatísticas em tempo real

### 📱 Futuro
- [ ] Versão mobile
- [ ] Notificações de resultado
- [ ] Exportar relatórios (PDF/Excel)

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