# 🚀 Transactions API – Desafio Técnico NestJS

Esta API foi desenvolvida como parte do desafio técnico para Desenvolvedor Pleno.  
Ela gerencia transações em memória e fornece estatísticas com base nas transações realizadas nos últimos 60 segundos.

---

## 📦 Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- TypeScript
- Clean Architecture
- Jest (Testes unitários e e2e)
- Swagger (Documentação)
- Helmet.js (Segurança)
- ThrottlerGuard (Rate Limiting)
- Pino (Logs estruturados)
- Docker e Docker Compose

---

## 🧱 Estrutura de Pastas

```bash
src/
├── application/use-cases       # Regras de negócio (casos de uso)
├── domain/entities             # Entidades de domínio
├── domain/repositories         # Contratos de repositórios
├── infrastructure/http         # Controllers e DTOs
├── infrastructure/filters      # Filtros globais (exceções)
├── infrastructure/repositories/in-memory  # Persistência em memória
├── config                      # Configurações de Logger, Throttling
└── main.ts                     # Entry point
```

---

## 🚀 Como rodar com Docker

### Pré-requisitos

- Docker e Docker Compose instalados

### Passo a passo

```bash
docker-compose build
docker-compose up
```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 📘 Documentação Swagger

Acesse a documentação interativa em:

```
GET /api-docs
```

URL completa: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 🔐 Segurança

- Helmet.js ativado globalmente
- Rate limiting: 10 requisições por minuto por IP (`@nestjs/throttler`)

---

## 📊 Endpoints

### ✅ `POST /transactions`

Cria uma nova transação.

#### Corpo da requisição:

```json
{
  "amount": 123.45,
  "timestamp": "2025-05-14T12:00:00.000Z"
}
```

#### Regras:

- `timestamp` não pode estar no futuro
- `amount` deve ser >= 0

#### Respostas:

- `201 Created`: Sucesso
- `422 Unprocessable Entity`: Timestamp inválido
- `400 Bad Request`: JSON malformado

---

### ❌ `DELETE /transactions`

Remove todas as transações da memória.

#### Resposta:

- `200 OK`

---

### 📈 `GET /transactions/statistics`

Retorna estatísticas das transações dos **últimos 60 segundos**.

#### Resposta:

```json
{
  "count": 2,
  "sum": 200,
  "avg": 100,
  "min": 50,
  "max": 150
}
```

Se não houver transações no período: retorna todos os valores como `0`.

---

## 🧪 Testes

Para rodar os testes (fora do Docker):

```bash
yarn test
yarn test:e2e
```