# MOBOGO API

Sistema nacional de gestão de transporte colectivo em Angola — emissão de passagens digitais (QR e código curto), localização GPS em tempo real, carteira digital e gestão multi-role.

---

## Índice

1. [Stack tecnológica](#stack-tecnológica)
2. [Arquitectura](#arquitectura)
3. [Estrutura de pastas](#estrutura-de-pastas)
4. [Schema da base de dados](#schema-da-base-de-dados)
5. [Autenticação e autorização](#autenticação-e-autorização)
6. [Sistema de QR Code](#sistema-de-qr-code-e-prevenção-de-fraude)
7. [Comunicação em tempo real](#comunicação-em-tempo-real)
8. [Rate Limiting](#rate-limiting)
9. [Instalação e configuração](#instalação-e-configuração)
10. [Variáveis de ambiente](#variáveis-de-ambiente)
11. [Endpoints completos](#endpoints-completos)
12. [Colecção Postman](#colecção-postman)
13. [Convenções de desenvolvimento](#convenções-de-desenvolvimento)

---

## Stack tecnológica

| Camada | Tecnologia | Justificação |
|---|---|---|
| Runtime | **Node.js 22 LTS** | I/O concorrente; ideal para WebSockets e GPS em tempo real |
| Framework | **NestJS + TypeScript** | Módulos, guards e interceptors mapeiam directamente para os 6 roles |
| ORM | **Prisma** | Type safety end-to-end; schema como fonte de verdade; migrations robustas |
| Base de dados principal | **PostgreSQL 16** | ACID obrigatório para operações financeiras e passagens |
| Dados temporais (GPS) | **TimescaleDB** | Extensão do Postgres; particionamento temporal automático para 5000+ táxis |
| Cache e estado volátil | **Redis 7** | Sessões, saldo em cache, posição GPS actual, Pub/Sub para WebSockets |
| Filas assíncronas | **BullMQ** | Integração nativa com NestJS; retry automático com backoff exponencial |
| Comunicação real-time | **Socket.io** | `@WebSocketGateway` do NestJS; Redis Pub/Sub para escala horizontal |
| Rate Limiting | **@nestjs/throttler** | 3 perfis: strict (5/min), default (60/min), loose (300/min) |
| Containerização | **Docker + Docker Compose** | Multi-stage build; imagem final ~180MB |

---

## Arquitectura

### Modular Monolith

A abordagem adoptada é **Modular Monolith** com fronteiras de domínio já desenhadas para facilitar extracção futura como microserviços. Cada domínio é um módulo NestJS completamente isolado — sem chamadas cruzadas directas, comunicação via eventos internos e BullMQ.

```
auth → iam → tickets → wallet → rides → location → notifications → reporting → lotador
```

Os módulos `Location` e `Ticket` são os candidatos naturais à extracção quando o volume o justificar (estimativa: > 50k tickets/dia ou > 2000 táxis simultâneos).

### Domínios

| Módulo | Responsabilidade | Dependências |
|---|---|---|
| `auth` | Login, JWT, refresh token rotation | `iam`, Redis |
| `iam/users` | CRUD utilizadores, bloqueio, soft delete | Notifications, Redis |
| `iam/agents` | Criação e delegação de permissões | Redis |
| `iam/drivers` | Taxistas, dias de trabalho, saldo | Notifications, Redis |
| `tickets` | Emissão, QR, validação, transferência | Notifications, Redis |
| `wallet` | Saldo, recargas, pagamentos atómicos | Notifications, Redis |
| `location` | GPS em tempo real via WebSocket + Pub/Sub | Redis |
| `rides` | Histórico de corridas, sumários | — |
| `reporting` | Relatórios, exportação CSV, jobs cron | Notifications |
| `notifications` | Push (FCM) e SMS via BullMQ | — |
| `lotador` | Referências, confirmar embarque | Redis |

### Camadas transversais (globais)

```
Request → ThrottlerGuard → JwtAuthGuard → RbacGuard → Controller
                                                          ↓
Response ← ResponseTransformInterceptor ← AuditLogInterceptor ← Service
```

- **GlobalExceptionFilter** — trata `HttpException`, erros Prisma (`P2002`, `P2025`...) e erros genéricos
- **ResponseTransformInterceptor** — envelopa todas as respostas 2xx: `{ success, data, timestamp, path }`
- **AuditLogInterceptor** — regista acções marcadas com `@AuditAction` na tabela `audit_logs`

---

## Estrutura de pastas

```
mobogo-api/
├── prisma/
│   ├── schema.prisma               # Schema completo com 9 modelos
│   ├── seed.ts                     # Dados iniciais para desenvolvimento
│   └── migrations/
│
├── src/
│   ├── main.ts                     # Bootstrap: Helmet, CORS, Swagger, graceful shutdown
│   ├── app.module.ts               # Regista todos os módulos + guards/interceptors globais
│   │
│   ├── config/
│   │   ├── app.config.ts           # Porta, CORS, rate limit, ticket defaults, Swagger
│   │   ├── database.config.ts      # URL, pool min/max, timeouts
│   │   ├── redis.config.ts         # URL, TTLs centralizados, canais Pub/Sub
│   │   └── jwt.config.ts           # Secret, expiração, issuer, audience, rotation
│   │
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts       # @CurrentUser() → JwtPayload
│   │   │   ├── require-permission.decorator.ts # @RequirePermission(Permission.X)
│   │   │   └── throttle.decorator.ts           # @ThrottleStrict/Medium/Default/Loose
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts               # Wrapper AuthGuard('jwt')
│   │   │   ├── rbac.guard.ts                   # Verifica permissions[] do JWT
│   │   │   └── throttler.guard.ts              # IP real via X-Forwarded-For
│   │   ├── filters/
│   │   │   └── global-exception.filter.ts      # Trata HttpException + Prisma errors
│   │   ├── interceptors/
│   │   │   ├── audit-log.interceptor.ts        # Regista acções em audit_logs
│   │   │   └── response-transform.interceptor.ts
│   │   ├── types/
│   │   │   ├── jwt-payload.type.ts             # { sub, role, permissions[], adminId? }
│   │   │   └── permission.enum.ts              # 23 permissões + ROLE_PERMISSIONS map
│   │   └── utils/
│   │       ├── crypto.util.ts                  # scrypt, HMAC, displayId, shortCode
│   │       └── pagination.util.ts              # toPrismaPage + paginate helpers
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts              # login, refresh, logout, change-password
│   │   │   ├── auth.service.ts                 # issueTokens, refresh rotation, cache Redis
│   │   │   ├── strategies/jwt.strategy.ts      # Valida JWT + cache de permissões (30s)
│   │   │   └── dto/
│   │   │
│   │   ├── iam/
│   │   │   ├── users/                          # CRUD + block/unblock + soft delete
│   │   │   ├── agents/                         # Criação + delegação de permissões
│   │   │   └── drivers/                        # Taxistas + workDays + saldo + lotadores
│   │   │
│   │   ├── tickets/
│   │   │   ├── tickets.service.ts              # create, scan, cancel, transfer
│   │   │   ├── qr/qr.service.ts                # HMAC-SHA256, TTL 60s, anti-replay Redis
│   │   │   └── dto/
│   │   │
│   │   ├── wallet/
│   │   │   └── wallet.service.ts               # Mutex Redis + $transaction atómica (5 ops)
│   │   │
│   │   ├── location/
│   │   │   ├── location.gateway.ts             # WebSocket + autenticação por handshake
│   │   │   └── location.service.ts             # Redis TTL 30s + TimescaleDB assíncrono
│   │   │
│   │   ├── rides/                              # Histórico + sumários diários/mensais
│   │   ├── reporting/
│   │   │   └── jobs/daily-report.job.ts        # Cron 23:55 timezone Africa/Luanda
│   │   ├── notifications/
│   │   │   ├── notifications.processor.ts      # BullMQ worker — Push + SMS
│   │   │   └── notifications.templates.ts      # 12 templates com interpolação {var}
│   │   └── lotador/                            # 3 métodos de embarque: QR/shortcode/ref
│   │
│   └── infrastructure/
│       ├── prisma/prisma.service.ts            # PrismaClient + softDelete helper
│       ├── redis/redis.service.ts              # 2 clientes (client + subscriber para Pub/Sub)
│       └── queue/queue.module.ts               # BullMQ: 4 filas + constantes de jobs
│
├── docker/
│   ├── Dockerfile                  # Multi-stage: deps → builder → runner (~180MB)
│   ├── Dockerfile.dev              # Hot reload com volume mount
│   └── docker-compose.yml          # API + Postgres + Redis + ferramentas (profile: tools)
│
├── .env.example
└── package.json
```

---

## Schema da base de dados

### Modelos

#### `User` — entidade central, todos os actores

```prisma
model User {
  id           String    @id @default(uuid())
  phone        String?   @unique            // nullable — passageiro sem telefone
  displayId    String?   @unique            // TAX-XXXXXXXX — gerado automaticamente
  name         String
  passwordHash String?                      // admin, agente, cliente, taxista
  pinHash      String?                      // passageiro sem telefone — PIN 4 dígitos
  role         Role                         // ADMIN | AGENT | DRIVER | PASSENGER | CLIENT | LOTADOR
  isActive     Boolean   @default(true)
  isBlocked    Boolean   @default(false)
  blockReason  String?
  createdById  String?
  createdAt    DateTime  @default(now())
  deletedAt    DateTime?                    // soft delete
  // constraint: phone IS NOT NULL OR display_id IS NOT NULL
}
```

#### `Agent` — criado pelo admin, com permissões delegadas

```prisma
model Agent {
  id               String   @id @default(uuid())
  userId           String   @unique
  adminId          String
  isActive         Boolean  @default(true)
  dailyTicketLimit Int      @default(100)
  permissions      String[] @default([])    // subset de Permission enum
}
```

#### `Driver` — taxista vinculado a um `Client`

```prisma
model Driver {
  id             String       @id @default(uuid())
  userId         String       @unique
  clientId       String
  licensePlate   String       @unique       // formato: LD-00-00-AA
  status         DriverStatus @default(ACTIVE)  // ACTIVE | INACTIVE | ON_TRIP | BLOCKED
  workDays       Int[]        @default([1,2,3,4,5])  // 0=Dom ... 6=Sáb
  currentBalance Decimal      @default(0)
}
```

#### `Wallet` — carteira digital

```prisma
model Wallet {
  id       String  @id @default(uuid())
  userId   String  @unique
  balance  Decimal @default(0)
  currency String  @default("AOA")
}
```

#### `Ticket` — passagem, coração do sistema

```prisma
model Ticket {
  id              String       @id @default(uuid())
  passengerId     String
  driverId        String
  issuedById      String
  amount          Decimal
  status          TicketStatus @default(PENDING)  // PENDING | USED | TRANSFERRED | CANCELLED | EXPIRED
  qrNonce         String       @unique            // referência interna — não exposta no QR
  shortCode       String?      @unique            // 6 dígitos para passageiro sem QR
  transferredToId String?
  cancelReason    String?
  cancelledById   String?
  usedAt          DateTime?
  expiresAt       DateTime
}
```

#### `Transaction` — registo financeiro imutável

```prisma
model Transaction {
  id            String          @id @default(uuid())
  walletId      String
  ticketId      String?         @unique
  type          TransactionType // TOPUP | PAYMENT | WITHDRAWAL | REFUND | TRANSFER_IN | TRANSFER_OUT
  amount        Decimal
  balanceBefore Decimal         // snapshot — auditoria independente do saldo actual
  balanceAfter  Decimal
  reference     String?         // referência externa (Multicaixa, etc.)
  metadata      Json?
}
```

#### `LocationEvent` — série temporal GPS (TimescaleDB)

```prisma
model LocationEvent {
  id         String   @id @default(uuid())
  driverId   String
  lat        Float
  lng        Float
  speed      Float    @default(0)
  heading    Float?
  recordedAt DateTime
  // índice: (driverId, recordedAt DESC)
}
```

#### `LotadorPartner` — parceria taxista-lotador

```prisma
model LotadorPartner {
  id            String   @id @default(uuid())
  driverId      String
  lotadorUserId String
  referenceCode String   @unique   // LOT-XXXX-XXXX
  isActive      Boolean  @default(true)
  // unique: (driverId, lotadorUserId)
}
```

#### `AuditLog` — registo imutável de todas as acções

```prisma
model AuditLog {
  id         String   @id @default(uuid())
  userId     String
  action     String   // ex: "ticket:cancel", "user:block"
  entityType String   // ex: "Ticket", "User"
  entityId   String
  metadata   Json?
  ipAddress  String?
  createdAt  DateTime @default(now())
}
```

### Diagrama de relações

```
User ──────────────────────────────────────────────────
 │ (1)                                                  │
 ├── (1) Agent [adminId → User]                         │
 ├── (1) Driver [clientId → User]                       │
 ├── (1) Wallet                                         │
 ├── (N) Ticket [passengerId | issuedById]              │
 └── (N) AuditLog                                       │
                                                        │
Driver ─────────────────────────────────────────────────
 ├── (N) Ticket [driverId]
 ├── (N) LocationEvent
 └── (N) LotadorPartner [driverId | lotadorUserId → User]

Wallet ──────────────────────────────────────────────────
 └── (N) Transaction [walletId | ticketId?]
```

---

## Autenticação e autorização

### Fluxo completo

```
POST /api/v1/auth/login
  → AuthService.login()
  → verifica phone/displayId + credential (password ou PIN)
  → carrega ROLE_PERMISSIONS[role] + permissões delegadas (se AGENT)
  → emite JWT access token (15min) + refresh token opaco (7d no Redis)

Cada request autenticado:
  → ThrottlerGuard (rate limit por IP)
  → JwtAuthGuard (verifica JWT)
  → JwtStrategy.validate() → cache Redis 30s → se miss: query Postgres
  → RbacGuard (verifica permissions[] do payload)
  → Controller → Service
```

### JWT Payload

```json
{
  "sub": "uuid-do-utilizador",
  "role": "AGENT",
  "permissions": [
    "ticket:create",
    "user:create:phone",
    "ticket:scan",
    "report:view:own"
  ],
  "adminId": "uuid-do-admin-que-criou",
  "iat": 1700000000,
  "exp": 1700000900
}
```

### Permissões disponíveis

| Permissão | Roles que a têm por defeito |
|---|---|
| `user:create:phone` | ADMIN, AGENT, CLIENT |
| `user:create:no_phone` | ADMIN, AGENT |
| `user:block` | ADMIN |
| `user:activate` | ADMIN |
| `user:view:all` | ADMIN |
| `agent:create` | ADMIN |
| `agent:delegate` | ADMIN |
| `agent:deactivate` | ADMIN |
| `ticket:create` | ADMIN, AGENT |
| `ticket:cancel` | ADMIN, DRIVER |
| `ticket:scan` | ADMIN, DRIVER, LOTADOR |
| `ticket:transfer` | PASSENGER |
| `ticket:view:history` | TODOS |
| `ticket:set:value` | ADMIN |
| `ticket:set:limit` | ADMIN |
| `wallet:topup` | PASSENGER |
| `wallet:withdraw` | PASSENGER |
| `wallet:view` | PASSENGER, DRIVER, CLIENT |
| `location:track` | DRIVER |
| `location:view:all` | ADMIN, LOTADOR |
| `report:view:own` | AGENT, DRIVER |
| `report:view:all` | ADMIN, CLIENT |
| `report:export` | ADMIN, CLIENT |

### Refresh Token Rotation

```
POST /api/v1/auth/refresh  { "refreshToken": "hex-opaco" }
  → verifica no Redis (key: auth:refresh:{token})
  → apaga o token actual imediatamente
  → emite novo par access + refresh
  → se token roubado e usado primeiro → utilizador legítimo recebe 401
```

---

## Sistema de QR Code e prevenção de fraude

### Geração (a cada 60 segundos no app)

```
GET /api/v1/tickets/:id/qr
  → gera payload: { tid, sig: HMAC-SHA256(tid + createdAt + SECRET), exp: now+60s }
  → encode: base64url(JSON.stringify(payload))
  → NUNCA persiste o conteúdo — calculado dinamicamente
```

### Validação no táxi (4 camadas)

```
POST /api/v1/tickets/scan  { mode: "qr", value: "base64url..." }
  1. decode base64url → { tid, sig, exp }
  2. verifica exp > now()                     → detecta screenshots antigos
  3. timingSafeEqual(sig, HMAC recalculado)   → detecta QR falsificados
  4. Redis SET NX qr:used:{tid} 1 EX 300     → detecta double-scan (atómico)
  5. UPDATE ticket SET status='USED'          → persiste no Postgres
```

### Short code (passageiro sem QR)

```
POST /api/v1/tickets/scan  { mode: "short_code", value: "123456" }
  → Redis INCR shortcode:attempts:{code}      → rate limit: 3 tentativas/hora
  → Redis SET NX shortcode:used:{tid} 1 EX 300
  → UPDATE ticket SET status='USED'
```

---

## Comunicação em tempo real

### Arquitectura WebSocket

```
Táxi (app mobile)
  → socket.io connect  /location  (JWT no handshake)
  → emit 'location:emit'  { lat, lng, speed, heading }
     → LocationService.updateDriverLocation()
        → Redis SET driver:loc:{id} (TTL 30s)
        → Redis SET driver:online:{id} (TTL 35s)
        → Postgres INSERT location_events (assíncrono)
        → Redis PUBLISH driver:location { driverId, lat, lng }
           → LocationGateway subscriber
              → socket.io emit 'location:update'
                 → room driver:{id}   (cliente que segue este táxi)
                 → room drivers:active (admin, lotador)
```

### Eventos WebSocket

| Evento (client → server) | Descrição |
|---|---|
| `location:emit` | Taxista envia posição GPS |
| `location:watch:driver` | Subscreve actualizações de um táxi |
| `location:watch:all` | Admin/lotador vê todos os táxis activos |
| `location:unwatch` | Para de seguir |

| Evento (server → client) | Descrição |
|---|---|
| `location:update` | Nova posição de um táxi |
| `location:snapshot` | Snapshot inicial de todos os táxis activos |
| `error` | Erro de autenticação ou validação |

---

## Rate Limiting

| Perfil | Limite | Endpoints |
|---|---|---|
| `@ThrottleStrict()` | 5 req / 60s | login, refresh, change-password |
| `@ThrottleMedium()` | 30 req / 60s | criação de recursos |
| `@ThrottleDefault()` | 60 req / 60s | **padrão global** |
| `@ThrottleLoose()` | 300 req / 60s | GPS, saldo em tempo real |
| `@SkipThrottle()` | sem limite | logout, health check |

O IP real é extraído de `X-Forwarded-For` → `X-Real-IP` → `req.ip` para suporte a proxies e load balancers.

---

## Instalação e configuração

### Pré-requisitos

| Ferramenta | Versão |
|---|---|
| Node.js | 22 LTS |
| npm | 10+ |
| Docker | última estável |
| Docker Compose | v2+ |
| Git | última estável |

### Verificar instalação

```bash
node -v && npm -v && docker -v && docker compose version
```

### Setup completo

```bash
# 1. Clonar
git clone https://github.com/yhanko/mobogo-api.git
cd mobogo-api

# 2. Instalar dependências
npm ci

# 3. Configurar variáveis de ambiente
cp .env.example .env
# editar .env com os valores reais

# 4. Gerar secrets seguros
openssl rand -hex 64  # → JWT_SECRET
openssl rand -hex 64  # → QR_HMAC_SECRET

# 5. Subir infraestrutura
docker compose -f docker/docker-compose.yml up -d

# 6. Migrations e seed
npx prisma migrate dev
npm run seed

# 7. Arrancar em desenvolvimento
npm run start:dev
```

API disponível em: `http://localhost:3000/api/v1`
Swagger UI em: `http://localhost:3000/docs`

### Comandos úteis

```bash
# Desenvolvimento com hot reload
npm run start:dev

# Build de produção
npm run build && npm run start:prod

# Prisma
npx prisma generate          # regenera o cliente após alterar schema
npx prisma migrate dev        # cria e aplica nova migration
npx prisma migrate deploy     # aplica migrations em produção
npx prisma studio             # GUI da base de dados

# Seed
npm run seed

# Subir ferramentas de debug (pgAdmin, Redis Commander, Mailhog)
docker compose -f docker/docker-compose.yml --profile tools up -d

# Testes
npm run test          # unitários
npm run test:cov      # com cobertura
npm run test:e2e      # end-to-end

# Verificar Redis
redis-cli ping        # → PONG
```

---

## Variáveis de ambiente

```env
# ── Aplicação ──────────────────────────────────────────
NODE_ENV=development
PORT=3000
APP_NAME=mobogo-api
APP_VERSION=1.0.0

# ── Base de dados ──────────────────────────────────────
DATABASE_URL=postgresql://taxi:taxi@localhost:5432/taxi_db
DB_POOL_MIN=2
DB_POOL_MAX=10
DB_POOL_ACQUIRE_TIMEOUT=30000
DB_POOL_IDLE_TIMEOUT=600000

# ── Redis ──────────────────────────────────────────────
REDIS_URL=redis://localhost:6379
REDIS_TTL_SESSION=900          # 15 min — access token
REDIS_TTL_REFRESH=604800       # 7 dias — refresh token
REDIS_TTL_QR=60                # 60s — conteúdo QR
REDIS_TTL_USED_TICKET=300      # 5 min — anti-replay
REDIS_TTL_PERM_CACHE=30        # 30s — cache de permissões
REDIS_TTL_SHORT_CODE=3600      # 1h — rate limit short code
REDIS_TTL_GPS=30               # 30s — posição activa do táxi

# ── JWT ────────────────────────────────────────────────
JWT_SECRET=min_64_chars_gerar_com_openssl_rand_hex_64
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
JWT_ROTATION_ENABLED=true
JWT_ISSUER=mobogo-api
JWT_AUDIENCE=mobogo-clients

# ── QR Code ────────────────────────────────────────────
QR_HMAC_SECRET=min_64_chars_gerar_com_openssl_rand_hex_64

# ── CORS ───────────────────────────────────────────────
CORS_ORIGINS=http://localhost:3001,http://localhost:3002

# ── Rate Limiting ──────────────────────────────────────
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=60

# ── Tickets ────────────────────────────────────────────
TICKET_DEFAULT_VALUE=150
TICKET_DEFAULT_DAILY_MAX=200
TICKET_EXPIRES_IN_HOURS=24

# ── Swagger ────────────────────────────────────────────
SWAGGER_ENABLED=true
SWAGGER_PATH=docs
```

---

## Endpoints completos

> **Base URL:** `http://localhost:3000/api/v1`
> **Autenticação:** `Authorization: Bearer <access_token>` em todos excepto `/auth/login`

---

### AUTH

| Método | Endpoint | Auth | Throttle | Descrição |
|---|---|---|---|---|
| POST | `/auth/login` | ❌ | Strict (5/min) | Login para todos os roles |
| POST | `/auth/refresh` | ❌ | Strict (5/min) | Troca refresh token |
| POST | `/auth/logout` | ❌ | Skip | Invalida refresh token |
| POST | `/auth/change-password` | ✅ | Strict (5/min) | Altera password/PIN |

---

### IAM — UTILIZADORES

| Método | Endpoint | Permissão | Descrição |
|---|---|---|---|
| POST | `/iam/users` | `user:create:phone` | Cria utilizador com telefone |
| POST | `/iam/users/no-phone` | `user:create:no_phone` | Cria passageiro sem telefone |
| GET | `/iam/users` | `user:view:all` | Lista todos (paginado + filtros) |
| GET | `/iam/users/me` | — | Perfil próprio |
| GET | `/iam/users/search?q=` | `user:view:all` | Pesquisa por telefone ou TAX-ID |
| GET | `/iam/users/:id` | `user:view:all` | Ver utilizador por ID |
| PATCH | `/iam/users/:id` | `user:activate` | Actualizar dados |
| PATCH | `/iam/users/:id/block` | `user:block` | Bloquear com motivo |
| PATCH | `/iam/users/:id/unblock` | `user:block` | Desbloquear |
| PATCH | `/iam/users/:id/activate` | `user:activate` | Activar |
| PATCH | `/iam/users/:id/deactivate` | `user:activate` | Desactivar |
| DELETE | `/iam/users/:id` | `user:block` | Soft delete |

**Query params de listagem:** `?page=1&limit=20&role=DRIVER&isActive=true&isBlocked=false`

---

### IAM — AGENTES

| Método | Endpoint | Permissão | Descrição |
|---|---|---|---|
| POST | `/iam/agents` | `agent:create` | Vincula utilizador AGENT ao admin |
| GET | `/iam/agents` | `agent:create` | Lista agentes do admin |
| GET | `/iam/agents/:id` | `agent:create` | Ver agente |
| PATCH | `/iam/agents/:id` | `agent:create` | Actualizar limite/permissões |
| PATCH | `/iam/agents/:id/permissions` | `agent:delegate` | Substituir permissões delegadas |
| PATCH | `/iam/agents/:id/activate` | `agent:deactivate` | Activar agente |
| PATCH | `/iam/agents/:id/deactivate` | `agent:deactivate` | Desactivar agente |
| GET | `/iam/agents/:id/activity` | `agent:create` | Actividade do dia/mês |

---

### IAM — TAXISTAS

| Método | Endpoint | Permissão | Descrição |
|---|---|---|---|
| POST | `/iam/drivers` | `user:create:phone` | Cliente adiciona taxista |
| GET | `/iam/drivers` | `ticket:view:history` | Lista taxistas do cliente |
| GET | `/iam/drivers/me` | — | Perfil próprio (taxista) |
| GET | `/iam/drivers/:id` | `ticket:view:history` | Ver taxista |
| PATCH | `/iam/drivers/:id` | `ticket:view:history` | Actualizar matrícula/dias |
| PATCH | `/iam/drivers/:id/work-days` | `ticket:view:history` | Definir dias de trabalho |
| PATCH | `/iam/drivers/:id/activate` | `user:activate` | Activar |
| PATCH | `/iam/drivers/:id/deactivate` | `user:activate` | Desactivar |
| PATCH | `/iam/drivers/:id/block` | `user:block` | Bloquear + remove GPS Redis |
| GET | `/iam/drivers/:id/balance` | `wallet:view` | Saldo actual |
| GET | `/iam/drivers/:id/payments` | `ticket:view:history` | Histórico de recebimentos |
| GET | `/iam/drivers/:id/lotadores` | `ticket:view:history` | Lotadores parceiros |

---

### TICKETS

| Método | Endpoint | Permissão | Descrição |
|---|---|---|---|
| POST | `/tickets` | `ticket:create` | Emitir passagem |
| GET | `/tickets/my` | `ticket:view:history` | Passagens do passageiro autenticado |
| GET | `/tickets/driver/today` | `ticket:view:history` | Passagens do taxista hoje |
| GET | `/tickets/driver/month` | `ticket:view:history` | Passagens do taxista este mês |
| GET | `/tickets/driver/:driverId` | `ticket:view:history` | Histórico de um taxista |
| GET | `/tickets/:id/qr` | `ticket:view:history` | Conteúdo QR + short code (TTL 60s) |
| POST | `/tickets/scan` | `ticket:scan` | Validar por QR ou short code |
| PATCH | `/tickets/:id/cancel` | `ticket:cancel` | Cancelar com motivo |
| PATCH | `/tickets/:id/transfer` | `ticket:transfer` | Transferir para outro passageiro |

**Query params histórico taxista:** `?period=day|month&page=1&limit=20`

---

### WALLET

| Método | Endpoint | Permissão | Descrição |
|---|---|---|---|
| GET | `/wallet/balance` | `wallet:view` | Saldo em tempo real |
| POST | `/wallet/topup` | `wallet:topup` | Recarregar carteira |
| POST | `/wallet/withdraw` | `wallet:withdraw` | Levantar dinheiro |
| POST | `/wallet/pay` | `wallet:topup` | Pagar ticket (5 ops atómicas) |
| GET | `/wallet/history` | `wallet:view` | Histórico de movimentações |
| GET | `/wallet/driver/:driverId/monthly` | `report:view:all` | Resumo mensal do taxista |

---

### CORRIDAS

| Método | Endpoint | Permissão | Descrição |
|---|---|---|---|
| GET | `/rides` | `ticket:view:history` | Todas as corridas (admin) |
| GET | `/rides/:id` | `ticket:view:history` | Detalhe de uma corrida |
| GET | `/rides/passenger/:id` | `ticket:view:history` | Corridas de um passageiro |
| GET | `/rides/driver/:id` | `ticket:view:history` | Corridas de um taxista |
| GET | `/rides/driver/:id/summary/daily` | `report:view:own` | Sumário diário |
| GET | `/rides/driver/:id/summary/monthly` | `report:view:own` | Sumário mensal |
| GET | `/rides/passenger/search?q=` | `ticket:scan` | Pesquisa passageiro por tel/ID |

**Query params:** `?from=2024-01-01&to=2024-01-31&status=USED&page=1&limit=20`
**Sumário mensal:** `?year=2024&month=1`

---

### LOCALIZAÇÃO

| Método | Endpoint | Permissão | Descrição |
|---|---|---|---|
| GET | `/location/drivers/active` | `location:view:all` | Táxis activos (posição do Redis) |
| GET | `/location/drivers/:id` | `location:view:all` | Posição actual de um táxi |
| GET | `/location/drivers/:id/history` | `location:view:all` | Histórico GPS (TimescaleDB) |

**Query params histórico:** `?from=2024-01-01T08:00:00Z&to=2024-01-01T18:00:00Z&limit=500`

**WebSocket:** `ws://localhost:3000/location`
```json
// Autenticação no handshake
{ "auth": { "token": "Bearer eyJ..." } }
```

---

### RELATÓRIOS

| Método | Endpoint | Permissão | Descrição |
|---|---|---|---|
| GET | `/reports/system` | `report:view:all` | Resumo geral do sistema |
| GET | `/reports/drivers/:id/daily` | `report:view:own` | Relatório diário do taxista |
| GET | `/reports/clients/:id/monthly` | `report:view:all` | Relatório mensal do cliente |
| GET | `/reports/agents` | `report:view:all` | Actividade de todos os agentes |

**Query params:** `?period=day|week|month|range&from=&to=&format=json|csv`
**CSV:** adicionar `?format=csv` → response com `Content-Disposition: attachment`

---

### LOTADOR

| Método | Endpoint | Permissão | Descrição |
|---|---|---|---|
| GET | `/lotador/drivers` | `location:view:all` | Táxis parceiros online/offline |
| GET | `/lotador/drivers/all` | `location:view:all` | Todos os táxis activos |
| POST | `/lotador/boarding` | `ticket:scan` | Confirmar embarque (QR/code/ref) |
| GET | `/lotador/drivers/:id/reference` | `location:view:all` | Referência da parceria |
| GET | `/lotador/partners` | `location:view:all` | Lista todos os parceiros |
| POST | `/lotador/partners` | `location:view:all` | Adicionar parceiro |
| DELETE | `/lotador/partners/:driverId` | `location:view:all` | Remover parceiro |

---

### HEALTH CHECK

| Método | Endpoint | Auth | Descrição |
|---|---|---|---|
| GET | `/health` | ❌ | Estado da API, Postgres e Redis |

---

## Colecção Postman

Importa o JSON abaixo directamente no Postman (**File → Import → Raw text**):

```json
{
  "info": {
    "name": "MOBOGO API",
    "description": "Colecção completa da API MOBOGO — sistema nacional de transporte colectivo em Angola",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    { "key": "base_url",      "value": "http://localhost:3000/api/v1" },
    { "key": "access_token",  "value": "" },
    { "key": "refresh_token", "value": "" },
    { "key": "driver_id",     "value": "" },
    { "key": "ticket_id",     "value": "" },
    { "key": "agent_id",      "value": "" },
    { "key": "passenger_id",  "value": "" }
  ],
  "item": [
    {
      "name": "AUTH",
      "item": [
        {
          "name": "Login — Admin",
          "event": [{ "listen": "test", "script": { "exec": [
            "const r = pm.response.json();",
            "if (r.data) {",
            "  pm.collectionVariables.set('access_token', r.data.accessToken);",
            "  pm.collectionVariables.set('refresh_token', r.data.refreshToken);",
            "}"
          ]}}],
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/login",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": { "mode": "raw", "raw": "{\n  \"phone\": \"+244923000001\",\n  \"credential\": \"admin123\"\n}" }
          }
        },
        {
          "name": "Login — Agente",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/login",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": { "mode": "raw", "raw": "{\n  \"phone\": \"+244923000002\",\n  \"credential\": \"agent123\"\n}" }
          }
        },
        {
          "name": "Login — Taxista",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/login",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": { "mode": "raw", "raw": "{\n  \"phone\": \"+244923000010\",\n  \"credential\": \"driver123\"\n}" }
          }
        },
        {
          "name": "Login — Passageiro",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/login",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": { "mode": "raw", "raw": "{\n  \"phone\": \"+244923000020\",\n  \"credential\": \"pass123\"\n}" }
          }
        },
        {
          "name": "Login — Passageiro sem telefone",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/login",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": { "mode": "raw", "raw": "{\n  \"displayId\": \"TAX-3F2A91BC\",\n  \"credential\": \"1234\"\n}" }
          }
        },
        {
          "name": "Login — Cliente",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/login",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": { "mode": "raw", "raw": "{\n  \"phone\": \"+244923000003\",\n  \"credential\": \"client123\"\n}" }
          }
        },
        {
          "name": "Refresh Token",
          "event": [{ "listen": "test", "script": { "exec": [
            "const r = pm.response.json();",
            "if (r.data) {",
            "  pm.collectionVariables.set('access_token', r.data.accessToken);",
            "  pm.collectionVariables.set('refresh_token', r.data.refreshToken);",
            "}"
          ]}}],
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/refresh",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": { "mode": "raw", "raw": "{\n  \"refreshToken\": \"{{refresh_token}}\"\n}" }
          }
        },
        {
          "name": "Logout",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/logout",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": { "mode": "raw", "raw": "{\n  \"refreshToken\": \"{{refresh_token}}\"\n}" }
          }
        },
        {
          "name": "Alterar Password",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/change-password",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"currentCredential\": \"admin123\",\n  \"newCredential\": \"novaPassword456\"\n}" }
          }
        }
      ]
    },
    {
      "name": "IAM — UTILIZADORES",
      "item": [
        {
          "name": "Criar utilizador com telefone",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/iam/users",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"name\": \"Novo Passageiro\",\n  \"phone\": \"+244923111111\",\n  \"credential\": \"senha123\",\n  \"role\": \"PASSENGER\"\n}" }
          }
        },
        {
          "name": "Criar passageiro sem telefone",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/iam/users/no-phone",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"name\": \"Passageiro Sem Tel\",\n  \"credential\": \"5678\",\n  \"role\": \"PASSENGER\"\n}" }
          }
        },
        {
          "name": "Listar utilizadores",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/iam/users?page=1&limit=20&role=PASSENGER",
              "query": [
                { "key": "page", "value": "1" },
                { "key": "limit", "value": "20" },
                { "key": "role", "value": "PASSENGER" }
              ]
            },
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Meu perfil",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/iam/users/me",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Pesquisar por telefone",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/iam/users/search?q=+244923000020",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Bloquear utilizador",
          "request": {
            "method": "PATCH",
            "url": "{{base_url}}/iam/users/{{passenger_id}}/block",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"reason\": \"Comportamento suspeito — múltiplas tentativas de fraude\"\n}" }
          }
        },
        {
          "name": "Desbloquear utilizador",
          "request": {
            "method": "PATCH",
            "url": "{{base_url}}/iam/users/{{passenger_id}}/unblock",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        }
      ]
    },
    {
      "name": "IAM — AGENTES",
      "item": [
        {
          "name": "Criar agente",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/iam/agents",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"userId\": \"uuid-do-utilizador-com-role-AGENT\",\n  \"dailyTicketLimit\": 150,\n  \"permissions\": [\n    \"ticket:create\",\n    \"user:create:phone\",\n    \"user:create:no_phone\",\n    \"ticket:scan\",\n    \"report:view:own\"\n  ]\n}" }
          }
        },
        {
          "name": "Listar agentes",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/iam/agents?page=1&limit=20",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Delegar permissões ao agente",
          "request": {
            "method": "PATCH",
            "url": "{{base_url}}/iam/agents/{{agent_id}}/permissions",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"permissions\": [\n    \"ticket:create\",\n    \"ticket:scan\",\n    \"user:create:no_phone\"\n  ]\n}" }
          }
        },
        {
          "name": "Actividade do agente",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/iam/agents/{{agent_id}}/activity",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Desactivar agente",
          "request": {
            "method": "PATCH",
            "url": "{{base_url}}/iam/agents/{{agent_id}}/deactivate",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        }
      ]
    },
    {
      "name": "IAM — TAXISTAS",
      "item": [
        {
          "name": "Adicionar taxista",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/iam/drivers",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"userId\": \"uuid-do-utilizador-com-role-DRIVER\",\n  \"licensePlate\": \"LD-00-99-ZZ\",\n  \"workDays\": [1, 2, 3, 4, 5]\n}" }
          }
        },
        {
          "name": "Listar taxistas",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/iam/drivers?status=ACTIVE&page=1&limit=20",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Meu perfil (taxista)",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/iam/drivers/me",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Definir dias de trabalho",
          "request": {
            "method": "PATCH",
            "url": "{{base_url}}/iam/drivers/{{driver_id}}/work-days",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"workDays\": [1, 2, 3, 4, 5, 6]\n}" }
          }
        },
        {
          "name": "Saldo do taxista",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/iam/drivers/{{driver_id}}/balance",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Histórico de recebimentos",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/iam/drivers/{{driver_id}}/payments?page=1&limit=20",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Lotadores parceiros do taxista",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/iam/drivers/{{driver_id}}/lotadores",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Bloquear taxista",
          "request": {
            "method": "PATCH",
            "url": "{{base_url}}/iam/drivers/{{driver_id}}/block",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        }
      ]
    },
    {
      "name": "TICKETS",
      "item": [
        {
          "name": "Emitir passagem",
          "event": [{ "listen": "test", "script": { "exec": [
            "const r = pm.response.json();",
            "if (r.data) pm.collectionVariables.set('ticket_id', r.data.id);"
          ]}}],
          "request": {
            "method": "POST",
            "url": "{{base_url}}/tickets",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"passengerId\": \"{{passenger_id}}\",\n  \"driverId\": \"{{driver_id}}\",\n  \"amount\": 150\n}" }
          }
        },
        {
          "name": "Obter QR Code",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/tickets/{{ticket_id}}/qr",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Validar por QR",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/tickets/scan",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"mode\": \"qr\",\n  \"value\": \"eyJ0aWQiOiJ1dWlkIiwic2lnIjoiaG1hYyIsImV4cCI6MTcwMH0\"\n}" }
          }
        },
        {
          "name": "Validar por Short Code",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/tickets/scan",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"mode\": \"short_code\",\n  \"value\": \"123456\"\n}" }
          }
        },
        {
          "name": "Cancelar passagem",
          "request": {
            "method": "PATCH",
            "url": "{{base_url}}/tickets/{{ticket_id}}/cancel",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"reason\": \"Passageiro desistiu da viagem antes do embarque\"\n}" }
          }
        },
        {
          "name": "Transferir passagem (por telefone)",
          "request": {
            "method": "PATCH",
            "url": "{{base_url}}/tickets/{{ticket_id}}/transfer",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"toPhone\": \"+244923000021\"\n}" }
          }
        },
        {
          "name": "Transferir passagem (por Display ID)",
          "request": {
            "method": "PATCH",
            "url": "{{base_url}}/tickets/{{ticket_id}}/transfer",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"toDisplayId\": \"TAX-3F2A91BC\"\n}" }
          }
        },
        {
          "name": "Minhas passagens",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/tickets/my?page=1&limit=20",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Passagens do taxista hoje",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/tickets/driver/today",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Passagens do taxista este mês",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/tickets/driver/month",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        }
      ]
    },
    {
      "name": "WALLET",
      "item": [
        {
          "name": "Ver saldo",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/wallet/balance",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Recarregar carteira",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/wallet/topup",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"amount\": 500,\n  \"reference\": \"MULTICAIXA-REF-123456\"\n}" }
          }
        },
        {
          "name": "Levantar dinheiro",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/wallet/withdraw",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"amount\": 200\n}" }
          }
        },
        {
          "name": "Pagar ticket via carteira",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/wallet/pay",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"ticketId\": \"{{ticket_id}}\"\n}" }
          }
        },
        {
          "name": "Histórico de movimentações",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/wallet/history?page=1&limit=20",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Saldo mensal do taxista",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/wallet/driver/{{driver_id}}/monthly",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        }
      ]
    },
    {
      "name": "CORRIDAS",
      "item": [
        {
          "name": "Todas as corridas (admin)",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/rides?page=1&limit=20&status=USED",
              "query": [
                { "key": "page", "value": "1" },
                { "key": "limit", "value": "20" },
                { "key": "status", "value": "USED" }
              ]
            },
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Corridas do taxista",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/rides/driver/{{driver_id}}?page=1&limit=20",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Sumário diário do taxista",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/rides/driver/{{driver_id}}/summary/daily?date=2024-01-15",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Sumário mensal do taxista",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/rides/driver/{{driver_id}}/summary/monthly?year=2024&month=1",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Pesquisar passageiro por telefone",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/rides/passenger/search?q=+244923000020",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        }
      ]
    },
    {
      "name": "LOCALIZAÇÃO",
      "item": [
        {
          "name": "Táxis activos",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/location/drivers/active",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Posição actual de um táxi",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/location/drivers/{{driver_id}}",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Histórico GPS",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/location/drivers/{{driver_id}}/history?from=2024-01-15T08:00:00Z&to=2024-01-15T18:00:00Z&limit=200",
              "query": [
                { "key": "from", "value": "2024-01-15T08:00:00Z" },
                { "key": "to", "value": "2024-01-15T18:00:00Z" },
                { "key": "limit", "value": "200" }
              ]
            },
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        }
      ]
    },
    {
      "name": "RELATÓRIOS",
      "item": [
        {
          "name": "Resumo do sistema hoje",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/reports/system?period=day",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Resumo do sistema — período custom",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/reports/system?period=range&from=2024-01-01&to=2024-01-31",
              "query": [
                { "key": "period", "value": "range" },
                { "key": "from", "value": "2024-01-01" },
                { "key": "to", "value": "2024-01-31" }
              ]
            },
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Relatório diário do taxista (JSON)",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/reports/drivers/{{driver_id}}/daily?period=day",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Relatório diário do taxista (CSV)",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/reports/drivers/{{driver_id}}/daily?period=day&format=csv",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Relatório mensal do cliente (JSON)",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/reports/clients/{{client_id}}/monthly",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Relatório mensal do cliente (CSV)",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/reports/clients/{{client_id}}/monthly?format=csv",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Actividade dos agentes",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/reports/agents?period=month",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        }
      ]
    },
    {
      "name": "LOTADOR",
      "item": [
        {
          "name": "Táxis parceiros online",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/lotador/drivers",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Todos os táxis activos",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/lotador/drivers/all",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Confirmar embarque por Short Code",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/lotador/boarding",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"method\": \"short_code\",\n  \"value\": \"123456\",\n  \"notes\": \"Embarque confirmado no ponto Kinaxixi\"\n}" }
          }
        },
        {
          "name": "Confirmar embarque por QR",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/lotador/boarding",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"method\": \"qr\",\n  \"value\": \"base64url-do-qr-code\"\n}" }
          }
        },
        {
          "name": "Confirmar embarque por Referência",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/lotador/boarding",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"method\": \"reference\",\n  \"value\": \"LOT-ABCD-EF12\"\n}" }
          }
        },
        {
          "name": "Referência de um taxista parceiro",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/lotador/drivers/{{driver_id}}/reference",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Listar parceiros",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/lotador/partners",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Adicionar parceiro",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/lotador/partners",
            "header": [
              { "key": "Content-Type", "value": "application/json" },
              { "key": "Authorization", "value": "Bearer {{access_token}}" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"driverId\": \"{{driver_id}}\"\n}" }
          }
        },
        {
          "name": "Remover parceiro",
          "request": {
            "method": "DELETE",
            "url": "{{base_url}}/lotador/partners/{{driver_id}}",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        }
      ]
    },
    {
      "name": "HEALTH",
      "item": [
        {
          "name": "Health Check",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/health"
          }
        }
      ]
    }
  ]
}
```

---

## Convenções de desenvolvimento

### Formato de resposta (todas as respostas 2xx)

```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/tickets"
}
```

### Formato de erro (todas as respostas 4xx/5xx)

```json
{
  "success": false,
  "statusCode": 403,
  "message": "Permissão insuficiente",
  "details": ["ticket:create"],
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/tickets"
}
```

### Paginação (todas as listagens)

```json
{
  "success": true,
  "data": {
    "items": [...],
    "meta": {
      "total": 245,
      "page": 1,
      "limit": 20,
      "totalPages": 13,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### Regras de ORM

Prisma para 90% das operações CRUD. `prisma.$queryRaw` para queries analíticas com `GROUP BY`, `DATE_TRUNC`, ou agregações complexas. Nunca trazer dados para memória para agregar em JavaScript.

### Filas BullMQ — regra de ouro

Notificações, relatórios e auditoria de pagamentos **nunca** acontecem no ciclo de request. O service enfileira e retorna imediatamente. O processor corre assincronamente com retry automático (3× backoff exponencial: 1s → 2s → 4s).

### Commits (Conventional Commits)

```
feat(tickets): add short code validation with rate limiting
fix(wallet): prevent double topup with Redis mutex
chore(prisma): add index on ticket.driverId
refactor(auth): extract permission cache to auth service
```

### Segurança — checklist mínimo

- `JWT_SECRET` e `QR_HMAC_SECRET` gerados com `openssl rand -hex 64`
- Passwords com scrypt (não bcrypt) — mais resistente a hardware especializado
- `timingSafeEqual` em todas as comparações de tokens e assinaturas
- Soft delete em vez de DELETE físico — preserva auditoria
- `SAFE_USER_SELECT` — `passwordHash` e `pinHash` nunca saem da base de dados
- Rate limit global + limites específicos por endpoint sensível
- Helmet activo — headers de segurança HTTP (XSS, clickjacking, etc.)
- Mutex Redis em todas as operações financeiras (`wallet:lock:{userId}`)

---

## Docker — comandos de produção

```bash
# Build da imagem (~180MB — multi-stage)
docker build -t mobogo-api -f docker/Dockerfile .

# Executar container
docker run -d \
  --name mobogo-api \
  -p 3000:3000 \
  --env-file .env \
  mobogo-api

# Com docker compose (ambiente completo)
docker compose -f docker/docker-compose.yml up -d

# Com ferramentas de debug (pgAdmin + Redis Commander + Mailhog)
docker compose -f docker/docker-compose.yml --profile tools up -d

# Ver logs
docker compose -f docker/docker-compose.yml logs -f api

# Migrations em produção
docker compose -f docker/docker-compose.yml exec api npx prisma migrate deploy
```

---

*MOBOGO API — construído com NestJS + TypeScript + Prisma + PostgreSQL + Redis*
*Versão 1.0.0 — Angola, 2026*