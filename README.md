# 🎯 Bet Tracker API

<p align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0902?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

<p align="center">
  API REST para gerenciamento e organização de apostas esportivas desenvolvida com <strong>NestJS</strong>, <strong>TypeORM</strong> e <strong>PostgreSQL</strong>.
</p>

---

## 📸 Preview

<img src="./assets/Captura de tela 2026-06-25 223501.png" width="800">

---

# 🚀 Tecnologias

- ⚡ NestJS
- 🟦 TypeScript
- 🐘 PostgreSQL
- 🔗 TypeORM
- 🐳 Docker & Docker Compose
- ✅ class-validator
- 🔒 ValidationPipe Global

---

# 📂 Estrutura do Projeto

```text
src
├── bets
│   ├── dto
│   ├── entities
│   ├── bets.controller.ts
│   ├── bets.service.ts
│   └── bets.module.ts
│
├── app.module.ts
└── main.ts
````

---

# ✨ Funcionalidades

* ✅ Cadastro de apostas
* ✅ Listagem de todas as apostas
* ✅ Busca por ID
* ✅ Atualização do resultado da aposta
* ✅ Remoção de apostas
* ✅ Cálculo automático de lucro/prejuízo
* ✅ Resumo do lucro total acumulado
* ✅ Validação global de dados

---

# 📊 Regras de Negócio

Cada aposta possui:

* Time da casa
* Time visitante
* Mercado
* Odd
* Valor apostado
* Status

### Resultado da aposta

| Status    | Resultado                       |
| --------- | ------------------------------- |
| `pending` | Aguardando resultado            |
| `won`     | Lucro = `(odd × valor) - valor` |
| `lost`    | Prejuízo = `-valor`             |

---

# ⚙️ Como executar

## Pré-requisitos

* Node.js 20+
* Docker
* Docker Compose

---

## Clone o projeto

```bash
git clone https://github.com/seu-usuario/bet-tracker.git

cd bet-tracker
```

---

## Instale as dependências

```bash
npm install
```

---

## Configure as variáveis de ambiente

Crie um arquivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=bet_tracker
```

---

## Suba o banco

```bash
docker compose up -d
```

---

## Execute a aplicação

```bash
npm run start:dev
```

A API estará disponível em:

```text
http://localhost:3000
```

---

# 📡 Endpoints

| Método | Endpoint        | Descrição                       |
| ------ | --------------- | ------------------------------- |
| POST   | `/bets`         | Criar aposta                    |
| GET    | `/bets`         | Listar apostas                  |
| GET    | `/bets/:id`     | Buscar aposta por ID            |
| PATCH  | `/bets/:id`     | Atualizar resultado             |
| DELETE | `/bets/:id`     | Remover aposta                  |
| GET    | `/bets/summary` | Retorna o lucro total acumulado |

---

# 📥 Exemplo de criação

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

---

# 📤 Exemplo de atualização

```http
PATCH /bets/:id
```

```json
{
  "status": "won"
}
```

---

# 📈 Exemplo de resposta

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

# 🔮 Roadmap

## 🔐 Autenticação

* [ ] Cadastro de usuários
* [ ] Hash de senha com bcrypt
* [ ] Login com JWT
* [ ] Refresh Token
* [ ] Logout
* [ ] OAuth2 (Google)

### 👤 Usuários

* [ ] Suporte a múltiplos usuários
* [ ] Relação Usuário → Apostas

### 📈 Melhorias

* [ ] Paginação
* [ ] Filtros por status
* [ ] Ordenação
* [ ] Dashboard com estatísticas
* [ ] Gráficos de lucro
* [ ] Histórico mensal

### 💻 Front-end

* [ ] Dashboard em React ou Next.js
* [ ] Login
* [ ] Cadastro
* [ ] Perfil
* [ ] Estatísticas em tempo real

---

# 🧪 Testes

```bash
npm run test
```

---

# 📝 Licença

Este projeto está sob a licença **MIT**.

---

# 👨‍💻 Autor

Desenvolvido por **Luiz** durante os estudos de Backend com **NestJS**, **PostgreSQL**, **Docker** e boas práticas de desenvolvimento.

Caso tenha sugestões ou queira contribuir, fique à vontade para abrir uma **Issue** ou enviar um **Pull Request**.

```
```
