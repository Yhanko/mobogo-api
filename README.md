# MOBOGO — Documentação Técnica

Sistema nacional de gestão de transporte colectivo em Angola, com suporte a emissão de passagens digitais (QR e código curto), localização GPS em tempo real, carteira digital e gestão multi-role.

---

## Índice

1. [Stack tecnológica](#stack-tecnológica)
2. [Arquitectura](#arquitectura)
3. [Base de dados](#base-de-dados)
4. [Autenticação e autorização](#autenticação-e-autorização)
5. [Sistema de QR Code](#sistema-de-qr-code-e-prevenção-de-fraude)
6. [Comunicação em tempo real](#comunicação-em-tempo-real)
7. [Estrutura de pastas](#estrutura-de-pastas)
8. [Infraestrutura e deploy](#infraestrutura-e-deploy)
9. [Convenções de desenvolvimento](#convenções-de-desenvolvimento)

---

## Stack tecnológica

| Camada | Tecnologia | Justificação |
|---|---|---|
| Framework | **NestJS + TypeScript** | Módulos, guards e interceptors mapeiam directamente para os 6 roles do sistema |
| ORM | **Prisma** | Type safety end-to-end; schema como fonte de verdade; migrations robustas |
| Base de dados principal | **PostgreSQL** | ACID obrigatório para operações financeiras e passagens |
| Dados temporais (GPS) | **TimescaleDB** | Extensão do Postgres; particionamento temporal automático para 5000+ táxis |
| Cache e estado volátil | **Redis** | Sessões, saldo em cache, posição GPS actual, rate limiting, pub/sub |
| Filas assíncronas | **BullMQ** | Integração nativa com NestJS; suficiente para o volume inicial |
| Comunicação real-time | **WebSockets** | `@WebSocketGateway` nativo do NestJS; Redis Pub/Sub para escala horizontal |

> **Nota:** Para queries analíticas pesadas (relatórios históricos, agregações geoespaciais), usa-se `prisma.$queryRaw` — o Prisma não impede SQL raw e é a abordagem correcta para esses casos.

---

## Arquitectura

### Modular Monolith (fase actual)

A abordagem é **Modular Monolith** com fronteiras de domínio já desenhadas para facilitar extracção futura. Cada domínio é um módulo NestJS completamente isolado: sem chamadas cruzadas directas, comunicação via eventos internos.

```
Identity → Ticket → Wallet → Location → Ride → Notification → Reporting → Lotador
```

Ir directamente para microserviços no lançamento seria um erro — multiplica complexidade operacional antes de o produto estar validado. Os módulos `Location` e `Ticket` são os candidatos naturais à extracção quando o volume o justificar.

### Domínios

| Domínio | Responsabilidade |
|---|---|
| `auth` | Login, JWT, refresh token, estratégias |
| `iam` | Utilizadores, agentes, taxistas |
| `tickets` | Emissão, QR, validação, transferência |
| `wallet` | Saldo, recargas, pagamentos |
| `location` | GPS em tempo real via WebSocket |
| `rides` | Histórico de corridas |
| `reporting` | Relatórios, exportação, jobs assíncronos |
| `notifications` | Push, SMS |
| `lotador` | Referências, embarque |

---

## Base de dados

### Três padrões de dados, três abordagens

**Dados transacionais** → PostgreSQL
Passagens, pagamentos, utilizadores, permissões. ACID é obrigatório aqui — não há alternativa razoável.

**Dados de localização em tempo real** → TimescaleDB
5000 táxis a emitir posição a cada 3-5 segundos geram ~1000-1700 eventos/segundo. O TimescaleDB (extensão do Postgres) resolve isso com particionamento temporal automático, mantendo familiaridade SQL.

**Estado volátil** → Redis
Sessões, saldos em cache e posição GPS actual. O saldo "em tempo real" visível ao passageiro não pode fazer query ao Postgres a cada segundo.

### Decisões de schema relevantes

**Entidade `USER` única com campo `role`** — padrão Single Table Inheritance leve. A alternativa (uma tabela por role) cria joins desnecessários em operações de autenticação.

**Constraint de identidade** — passageiros sem telefone são identificados por `display_id`. Nunca ambos a null:

**Campo `transferred_to` no `TICKET`** — suporta transferência de passagem entre passageiros.

**Campo `short_code`** — código numérico curto para passageiros sem telemóvel, como alternativa ao QR.

---

## Autenticação e autorização

### Stack

JWT com **refresh token rotation** + **RBAC baseado em permissões granulares**.

### O erro a evitar

Guardar `role` no JWT e fazer `if (user.role === 'admin')` no código. Escala mal — quando um agente tem permissões delegadas pelo admin, o modelo de roles simples não funciona. A abordagem correcta é guardar `permissions[]` no token, não o role.

### Fluxo de autenticação

```
Login → Auth Service → lê permissões da tabela AGENT/USER → emite JWT com permissions[]
```

A delegação de permissões (admin → agente) não altera o JWT existente. Na próxima vez que o agente fizer login, o Auth Service lê as permissões actualizadas e emite um novo token. Revogar permissões tem efeito máximo em 15 minutos (TTL do access token), sem precisar de blacklist de tokens.

### Passageiros sem telefone

Login via `display_id` + PIN numérico de 4 dígitos definido no cadastro pelo agente.

### Roles do sistema

| Role | Descrição |
|---|---|
| `admin` | Acesso total; cria agentes |
| `agent` | Permissões delegadas pelo admin |
| `driver` | Taxista vinculado a um `client`; tem saldo e placa |
| `passenger` | Qualquer utilizador; pode não ter telefone |
| `lotador` | Gestão de referências e embarque |
| `client` | Empresa/operador que vincula taxistas |

---

## Sistema de QR Code e prevenção de fraude

### Superfícies de ataque

- Reutilização de ticket já usado
- Geração de QR codes falsos
- Captura do QR de outro passageiro (screenshot)
- Partilha de screenshots

### Solução: QR codes assimétricos com TTL curto

O campo `qr_code` no schema não contém o QR — é uma referência opaca. O conteúdo real é gerado **no momento de exibição**, não no de emissão:

```typescript
const qrPayload = {
  tid: ticket.id,                           // ID do ticket
  sig: hmacSha256(                          // Assinatura HMAC
    ticket.id + ticket.createdAt + SECRET_KEY
  ),
  exp: Date.now() + 60_000                  // Expira em 60 segundos
};
// QR exibe: base64url(JSON.stringify(qrPayload))
```

### Processo de validação no táxi

1. **Verifica assinatura HMAC** → detecta QR falsos
2. **Verifica `exp`** → detecta screenshots velhos
3. **Consulta Redis** → verifica se `tid` já foi usado nos últimos 5 min (anti-double-scan)
4. **Marca como `used`** no Postgres com transacção atómica

```typescript
// Anti-double-use em memória — antes de tocar na base de dados
SET used_ticket:{tid} 1 EX 300
```

### Short code (passageiros sem QR)

Código numérico de 6 dígitos com limite de **3 tentativas por código por hora**, implementado com Redis rate limiting.

---

## Comunicação em tempo real

### Volume

5000 táxis × 1 posição a cada 3-5 segundos = **~1000-1700 eventos/segundo**.

### Arquitectura

```
Táxi (App) → WebSocket → Servidor A → Redis Pub/Sub → Servidor B → Admin/Passageiro
```

O Redis Pub/Sub é o que permite escala horizontal: um táxi pode estar ligado ao Servidor A enquanto o admin está no Servidor B — o Redis faz a ponte. Sem Redis, a escala horizontal de WebSockets é impossível.

### Implementação NestJS

```typescript
@WebSocketGateway()
export class LocationGateway {
  // Redis Pub/Sub via ioredis
  // Eventos: location:update, driver:online, driver:offline
}
```

---

## Estrutura de pastas

```
mobogo-api/
├── prisma/                          # Schema e migrations
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
└── src/
    ├── main.ts
    ├── app.module.ts
    │
    ├── config/                      # Variáveis de ambiente
    │   ├── app.config.ts
    │   ├── database.config.ts
    │   ├── redis.config.ts
    │   └── jwt.config.ts
    │
    ├── common/                      # Partilhado entre módulos
    │   ├── decorators/
    │   │   ├── current-user.decorator.ts
    │   │   └── require-permission.decorator.ts
    │   ├── guards/
    │   │   ├── jwt-auth.guard.ts
    │   │   └── rbac.guard.ts
    │   ├── interceptors/
    │   │   ├── audit-log.interceptor.ts
    │   │   └── response-transform.interceptor.ts
    │   ├── types/
    │   │   ├── jwt-payload.type.ts
    │   │   └── permission.enum.ts
    │   └── utils/
    │       ├── pagination.util.ts
    │       └── crypto.util.ts
    │
    ├── modules/                     # Domínios de negócio
    │   ├── auth/                    # Login, JWT, refresh
    │   │   ├── auth.module.ts
    │   │   ├── auth.controller.ts
    │   │   ├── auth.service.ts
    │   │   ├── strategies/
    │   │   │   └── jwt.strategy.ts
    │   │   └── dto/
    │   │       ├── login.dto.ts
    │   │       └── refresh-token.dto.ts
    │   │
    │   ├── iam/                     # Utilizadores, agentes, taxistas
    │   │   ├── users/
    │   │   ├── agents/
    │   │   └── drivers/
    │   │       # cada sub-módulo: controller · service · dto/
    │   │
    │   ├── tickets/                 # Emissão, QR, validação
    │   │   ├── tickets.module.ts
    │   │   ├── tickets.controller.ts
    │   │   ├── tickets.service.ts
    │   │   ├── qr/
    │   │   │   ├── qr.service.ts
    │   │   │   └── qr.types.ts
    │   │   └── dto/
    │   │       # create · scan · cancel · transfer
    │   │
    │   ├── wallet/                  # Saldo, recargas, pagamentos
    │   ├── location/                # GPS em tempo real
    │   │   ├── location.module.ts
    │   │   ├── location.service.ts
    │   │   └── location.gateway.ts  # ← WebSocket
    │   │
    │   ├── rides/                   # Histórico de corridas
    │   ├── reporting/               # Relatórios, exportação PDF
    │   │   └── jobs/
    │   │       └── daily-report.job.ts
    │   ├── notifications/           # Push, SMS
    │   └── lotador/                 # Referências, embarque
    │
    └── infrastructure/              # Serviços de infraestrutura
        ├── prisma/
        │   └── prisma.service.ts
        ├── redis/
        │   └── redis.service.ts
        └── queue/
            └── queue.module.ts      # ← BullMQ
```

## Convenções de desenvolvimento

### ORM

Prisma para 90% das operações CRUD. Para queries analíticas pesadas, usa `prisma.$queryRaw`:

```typescript
// Exemplo: agregação de corridas por período e município
const result = await prisma.$queryRaw`
  SELECT municipality, COUNT(*) as rides, SUM(fare) as revenue
  FROM rides
  WHERE created_at BETWEEN ${start} AND ${end}
  GROUP BY municipality
`;
```

### Filas assíncronas

Notificações, relatórios assíncronos e auditoria de pagamentos não acontecem no ciclo de request — vão para BullMQ:

```typescript
@Processor('notifications')
export class NotificationsProcessor {
  @Process('send-push')
  async handlePush(job: Job<PushPayload>) { /* ... */ }
}
```

### Estrutura de módulo NestJS (padrão)

```
módulo/
├── módulo.module.ts
├── módulo.controller.ts
├── módulo.service.ts
└── dto/
    ├── create-X.dto.ts
    └── update-X.dto.ts
```

Módulos mais complexos (ex: `tickets`) têm sub-serviços (`qr/`) e jobs separados.

# Instalação e Configuração do Ambiente

## Pré-requisitos

Antes de executar o projecto, certifique-se de que possui as seguintes ferramentas instaladas:

| Ferramenta     | Versão Recomendada    |
| -------------- | --------------------- |
| Node.js        | 22 LTS ou superior    |
| npm            | 10+                   |
| Docker         | Última versão estável |
| Docker Compose | Última versão estável |
| PostgreSQL     | 16+                   |
| Redis          | 7+                    |
| Git            | Última versão estável |

### Verificar instalação

```bash
node -v
npm -v
docker -v
docker compose version
git --version
```

---

# Download do projecto

## Clonar via Git

```bash
git clone https://github.com/yhanko/mobogo-api.git
```

Entrar na pasta do projecto:

```bash
cd mobogo-api
```

## Alternativa: Download ZIP

1. Abrir o repositório no GitHub.
2. Clicar em **Code**.
3. Seleccionar **Download ZIP**.
4. Extrair os ficheiros.
5. Abrir a pasta no terminal.

---

# Instalação de dependências

Instalar todas as dependências do projecto:

```bash
npm install
```

ou

```bash
npm ci
```

(`npm ci` é recomendado para ambientes de produção e CI/CD.)

---

# Configuração das variáveis de ambiente

Criar o ficheiro `.env` na raiz do projecto:

Variaveis estão em ``` exemple.env```

```bash
cp .env
```

---

# Inicialização da infraestrutura local

## PostgreSQL e Redis com Docker

Criar um ficheiro `docker-compose.yml`:

Subir os serviços:

```bash
docker compose up -d
```

Verificar se estão activos:

```bash
docker ps
```

---

# Prisma ORM

## Gerar cliente Prisma

```bash
npx prisma generate
```

## Executar migrations

```bash
npx prisma migrate dev
```

## Aplicar migrations em produção

```bash
npx prisma migrate deploy
```

## Abrir Prisma Studio

```bash
npx prisma studio
```

---

# Popular base de dados (Seed)

Executar os dados iniciais:

```bash
npm run seed
```

ou

```bash
npx ts-node prisma/seed.ts
```

Exemplos de dados iniciais:

* Admin principal
* Agentes
* Clientes
* Taxistas
* Passageiros de teste
* Permissões padrão

---

# Executar o projecto

## Ambiente de desenvolvimento

```bash
npm run start:dev
```

Servidor disponível em:

```text
http://localhost:8000
```

Hot Reload activado automaticamente.

---

## Ambiente de produção

Compilar:

```bash
npm run build
```

Executar:

```bash
npm run start:prod
```

---

# Executar testes

## Testes unitários

```bash
npm run test
```

## Testes com cobertura

```bash
npm run test:cov
```

## Testes end-to-end

```bash
npm run test:e2e
```

---

# Filas BullMQ

O Redis deve estar activo antes da aplicação iniciar.

Verificação:

```bash
redis-cli ping
```

Resposta esperada:

```text
PONG
```

As filas utilizadas incluem:

```text
notifications
reports
audit
payments
```

---

# WebSockets

Após iniciar a API, os clientes podem conectar-se através de:

```text
ws://localhost:8000
```

Eventos suportados:

```text
location:update
driver:online
driver:offline
ticket:validated
wallet:updated
```

---

# Verificação de saúde da aplicação

Endpoint:

```http
GET /health
```

Resposta esperada:

```json
{
  "status": "ok",
  "database": "connected",
  "redis": "connected"
}
```

# Ambiente de Produção

## Build Docker

```bash
docker build -t mobogo-api .
```

## Executar container

```bash
docker run -d \
  --name mobogo-api \
  -p 8000:8000 \
  --env-file .env \
  mobogo-api
```

# Primeira execução

Passos resumidos:

```bash
git clone <repositorio>
cd mobogo-api

npm install

cp .env.example .env

docker compose up -d

npx prisma migrate dev

npm run seed

npm run start:dev
```

A API ficará disponível em:

```text
http://localhost:Porta-definida
```
