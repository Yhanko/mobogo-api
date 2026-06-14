// ─────────────────────────────────────────────────────────────────────────────
// prisma/seed.ts
// Dados iniciais para desenvolvimento e testes
// Corre com: npx prisma db seed
// ─────────────────────────────────────────────────────────────────────────────

import { PrismaClient } from '@prisma/client';
import { Role, DriverStatus } from '@/prisma';
import { hashPassword, generateDisplayId, generateLotadorReference } from '../src/common/utils/crypto.util';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 A iniciar seed...\n');

  // ── Limpa dados existentes (ordem importa por causa das FK) ───────────────
  await prisma.auditLog.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.lotadorPartner.deleteMany();
  await prisma.locationEvent.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Dados anteriores limpos\n');

  // ── 1. Admin ──────────────────────────────────────────────────────────────
  const admin = await prisma.user.create({
    data: {
      phone:        '+244943558106',
      name:         'Admin Principal',
      role:         Role.ADMIN,
      passwordHash: await hashPassword('Imaculada123@&'),
      isActive:     true,
    },
  });

  await prisma.wallet.create({
    data: { userId: admin.id, balance: 0 },
  });

  console.log(`✅ Admin criado:       ${admin.name} (${admin.phone})`);

  // ── 2. Agente (criado pelo admin) ─────────────────────────────────────────
  const agentUser = await prisma.user.create({
    data: {
      phone:        '+244923000002',
      name:         'Agente João',
      role:         Role.AGENT,
      passwordHash: await hashPassword('agent123'),
      isActive:     true,
      createdById:  admin.id,
    },
  });

  await prisma.agent.create({
    data: {
      userId:          agentUser.id,
      adminId:         admin.id,
      dailyTicketLimit: 150,
      permissions:     [
        'ticket:create',
        'user:create:phone',
        'user:create:no_phone',
        'ticket:scan',
        'report:view:own',
      ],
    },
  });

  await prisma.wallet.create({
    data: { userId: agentUser.id, balance: 0 },
  });

  console.log(`✅ Agente criado:      ${agentUser.name} (${agentUser.phone})`);

  // ── 3. Cliente (empresa que contrata taxistas) ────────────────────────────
  const client = await prisma.user.create({
    data: {
      phone:        '+244923000003',
      name:         'Transportes Luanda Lda',
      role:         Role.CLIENT,
      passwordHash: await hashPassword('client123'),
      isActive:     true,
    },
  });

  await prisma.wallet.create({
    data: { userId: client.id, balance: 50_000 },
  });

  console.log(`✅ Cliente criado:     ${client.name} (${client.phone})`);

  // ── 4. Taxistas ───────────────────────────────────────────────────────────
  const driversData = [
    { phone: '+244923000010', name: 'Taxista Manuel',  plate: 'LD-00-10-AA', balance: 2_500 },
    { phone: '+244923000011', name: 'Taxista António', plate: 'LD-00-11-BB', balance: 1_800 },
    { phone: '+244923000012', name: 'Taxista Carlos',  plate: 'LD-00-12-CC', balance: 3_200 },
  ];

  const drivers: { user: any; driver: any }[] = [];

  for (const d of driversData) {
    const user = await prisma.user.create({
      data: {
        phone:        d.phone,
        name:         d.name,
        role:         Role.DRIVER,
        passwordHash: await hashPassword('driver123'),
        isActive:     true,
        createdById:  client.id,
      },
    });

    const driver = await prisma.driver.create({
      data: {
        userId:         user.id,
        clientId:       client.id,
        licensePlate:   d.plate,
        status:         DriverStatus.ACTIVE,
        workDays:       [1, 2, 3, 4, 5],       // segunda a sexta
        currentBalance: d.balance,
      },
    });

    await prisma.wallet.create({
      data: { userId: user.id, balance: d.balance },
    });

    drivers.push({ user, driver });
    console.log(`✅ Taxista criado:     ${user.name} (${d.plate})`);
  }

  // ── 5. Passageiros com telefone ───────────────────────────────────────────
  const passengersData = [
    { phone: '+244923000020', name: 'Passageiro Pedro',   balance: 500  },
    { phone: '+244923000021', name: 'Passageiro Maria',   balance: 1200 },
    { phone: '+244923000022', name: 'Passageiro Fernanda', balance: 300 },
  ];

  const passengers: any[] = [];

  for (const p of passengersData) {
    const user = await prisma.user.create({
      data: {
        phone:        p.phone,
        name:         p.name,
        role:         Role.PASSENGER,
        passwordHash: await hashPassword('pass123'),
        isActive:     true,
      },
    });

    await prisma.wallet.create({
      data: { userId: user.id, balance: p.balance },
    });

    passengers.push(user);
    console.log(`✅ Passageiro criado:  ${user.name} (${user.phone})`);
  }

  // ── 6. Passageiro sem telefone (identificado por displayId) ───────────────
  const passengerNoPhone = await prisma.user.create({
    data: {
      displayId:    generateDisplayId(),          // ex: TAX-3F2A91BC
      name:         'Passageiro Sem Telefone',
      role:         Role.PASSENGER,
      pinHash:      await hashPassword('1234'),   // PIN numérico
      isActive:     true,
      createdById:  agentUser.id,
    },
  });

  await prisma.wallet.create({
    data: { userId: passengerNoPhone.id, balance: 200 },
  });

  console.log(`✅ Passageiro s/tel:   ${passengerNoPhone.name} (ID: ${passengerNoPhone.displayId})`);

  // ── 7. Lotador ────────────────────────────────────────────────────────────
  const lotador = await prisma.user.create({
    data: {
      phone:        '+244923000030',
      name:         'Lotador Kinaxixi',
      role:         Role.LOTADOR,
      passwordHash: await hashPassword('lotador123'),
      isActive:     true,
    },
  });

  await prisma.wallet.create({
    data: { userId: lotador.id, balance: 0 },
  });

  console.log(`✅ Lotador criado:     ${lotador.name} (${lotador.phone})`);

  // ── 8. Parceria taxista-lotador ───────────────────────────────────────────
  for (const { driver } of drivers) {
    await prisma.lotadorPartner.create({
      data: {
        driverId:      driver.id,
        lotadorUserId: lotador.id,
        referenceCode: generateLotadorReference(), // ex: LOT-ABCD-EF12
      },
    });
  }

  console.log(`✅ Parcerias lotador criadas (${drivers.length} taxistas)`);

  // ── 9. Tickets de exemplo ─────────────────────────────────────────────────
  const { randomBytes, createHmac } = await import('crypto');

  const ticketsData = [
    { passenger: passengers[0], driver: drivers[0].driver, status: 'USED'    as const },
    { passenger: passengers[1], driver: drivers[0].driver, status: 'PENDING' as const },
    { passenger: passengers[2], driver: drivers[1].driver, status: 'PENDING' as const },
    { passenger: passengers[0], driver: drivers[2].driver, status: 'CANCELLED' as const },
  ];

  for (const t of ticketsData) {
    const nonce = randomBytes(16).toString('hex');
    const shortCode = Math.floor(100_000 + Math.random() * 900_000).toString();

    await prisma.ticket.create({
      data: {
        passengerId:  t.passenger.id,
        driverId:     t.driver.id,
        issuedById:   agentUser.id,
        amount:       150,
        status:       t.status,
        qrNonce:      nonce,
        shortCode,
        cancelReason: t.status === 'CANCELLED' ? 'Seed de teste' : null,
        usedAt:       t.status === 'USED' ? new Date() : null,
        expiresAt:    new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }

  console.log(`✅ Tickets criados:    ${ticketsData.length} tickets de exemplo`);

  // ── 10. Transacções de exemplo ────────────────────────────────────────────
  const pedroWallet = await prisma.wallet.findUnique({
    where: { userId: passengers[0].id },
  });

  if (pedroWallet) {
    await prisma.transaction.create({
      data: {
        walletId:      pedroWallet.id,
        type:          'TOPUP',
        amount:        500,
        balanceBefore: 0,
        balanceAfter:  500,
        reference:     'SEED-TOPUP-001',
        metadata:      { source: 'seed', method: 'manual' },
      },
    });
  }

  console.log(`✅ Transacções criadas`);

  // ── Resumo ────────────────────────────────────────────────────────────────
  console.log('\n─────────────────────────────────────────');
  console.log('🎉 Seed concluído!\n');
  console.log('Credenciais de acesso:');
  console.log('  Admin:     +244923000001 / admin123');
  console.log('  Agente:    +244923000002 / agent123');
  console.log('  Cliente:   +244923000003 / client123');
  console.log('  Taxista:   +244923000010 / driver123');
  console.log('  Passageiro:+244923000020 / pass123');
  console.log(`  S/Telefone: ID=${passengerNoPhone.displayId} / PIN=1234`);
  console.log('  Lotador:   +244923000030 / lotador123');
  console.log('─────────────────────────────────────────\n');
}

main()
  .catch((err) => {
    console.error('❌ Erro no seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });