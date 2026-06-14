import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { UsersController } from '../src/modules/iam/users/users.controller';
import { UsersService } from '../src/modules/iam/users/users.service';
import { PrismaService } from '../src/infra/prisma/prisma.service';
import { RedisService } from '../src/infra/redis/redis.service';
import { NotificationsService } from '../src/modules/notifications/notifications.service';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { RbacGuard } from '../src/common/guards/rbac.guard';
import { Role } from '@/prisma';

// "Base de Dados em memória" (Array)
const inMemoryUsers: any[] = [];

describe('Users Registration Workflow (e2e)', () => {
  let app: INestApplication;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn().mockImplementation(async ({ where }) => {
        return inMemoryUsers.find(u => u.phone === where.phone) || null;
      }),
      create: jest.fn().mockImplementation(async ({ data }) => {
        const newUser = { id: `user-${Date.now()}`, ...data };
        inMemoryUsers.push(newUser);
        return newUser;
      }),
    },
    wallet: {
      create: jest.fn().mockImplementation(async ({ data }) => {
        return { id: `wallet-${Date.now()}`, ...data };
      }),
    },
    $transaction: jest.fn().mockImplementation(async (cb) => {
      // Simula uma transação do Prisma retornando a si mesmo
      return cb(mockPrismaService);
    }),
  };

  const mockRedisService = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
  };

  const mockNotificationsService = {
    sendSms: jest.fn(),
  };

  beforeAll(async () => {
    // Isola o Controller e Service em vez de carregar a APP inteira (evita crash do env.config)
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: RedisService, useValue: mockRedisService },
        { provide: NotificationsService, useValue: mockNotificationsService },
      ],
    })
    .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })
    .overrideGuard(RbacGuard).useValue({ canActivate: () => true })
    .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    
    // Fake Middleware para simular que o Request já tem um JWT extraído
    app.use((req: any, res: any, next: any) => {
      req.user = { sub: 'admin-123', role: 'ADMIN' };
      next();
    });

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/iam/users (POST) - Deve cadastrar utilizador na DB em memória', () => {
    return request(app.getHttpServer())
      .post('/iam/users')
      .send({
        phone: '+244923000000',
        name: 'Utilizador Teste Memoria',
        credential: 'Password123!',
        role: Role.PASSENGER
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe('Utilizador Teste Memoria');
        // Valida que o utilizador foi inserido com sucesso na nossa RAM
        expect(inMemoryUsers.length).toBe(1);
        expect(inMemoryUsers[0].phone).toBe('+244923000000');
      });
  });
});
