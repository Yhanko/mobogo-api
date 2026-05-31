import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationGateway } from './location.gateway';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { RedisService } from '../../infrastructure/redis/redis.service';

@Module({
  imports: [
    // JwtModule necessário no Gateway para verificar token no handshake WS
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          issuer: config.get('JWT_ISSUER', 'taxi-api'),
          audience: config.get('JWT_AUDIENCE', 'taxi-clients'),
        },
      }),
    }),
  ],
  controllers: [LocationController],
  providers: [LocationService, LocationGateway, PrismaService, RedisService],
  exports: [LocationService],
})
export class LocationModule {}
