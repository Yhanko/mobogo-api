import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  url: process.env.REDIS_URL,

  // TTLs centralizados — única fonte de verdade para expiração
  ttl: {
    session: parseInt(process.env.REDIS_TTL_SESSION ?? '900', 10), // 15 min — access token
    refreshToken: parseInt(process.env.REDIS_TTL_REFRESH ?? '604800', 10), // 7 dias
    qrCode: parseInt(process.env.REDIS_TTL_QR ?? '60', 10), // 60 segundos
    usedTicket: parseInt(process.env.REDIS_TTL_USED_TICKET ?? '300', 10), // 5 min anti-replay
    userPermCache: parseInt(process.env.REDIS_TTL_PERM_CACHE ?? '30', 10), // 30 seg cache de perms
    shortCode: parseInt(process.env.REDIS_TTL_SHORT_CODE ?? '3600', 10), // 1 hora rate limit
    gpsLocation: parseInt(process.env.REDIS_TTL_GPS ?? '30', 10), // 30 seg posição activa
  },

  // Pub/Sub — canais para GPS em tempo real
  channels: {
    driverLocation: 'driver:location',
    ticketEvents: 'ticket:events',
    notifications: 'notifications',
  },
}));
