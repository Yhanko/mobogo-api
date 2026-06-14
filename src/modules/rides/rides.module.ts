import { Module } from '@nestjs/common';
import { RidesController } from '@/modules/rides/rides.controller';
import { RidesService } from '@/modules/rides/rides.service';
import { PrismaService } from '@/infra/prisma/prisma.service';

@Module({
  controllers: [RidesController],
  providers: [RidesService, PrismaService],
  exports: [RidesService],
})
export class RidesModule {}
