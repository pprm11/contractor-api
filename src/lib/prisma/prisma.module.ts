import { Module } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { IPrismaServiceConstant } from '../../lib/prisma/prisma.service.interface';

@Module({
  providers: [
    {
      provide: IPrismaServiceConstant,
      useClass: PrismaService,
    },
  ],
  exports: [
    {
      provide: IPrismaServiceConstant,
      useClass: PrismaService,
    },
  ],
})
export class PrismaModule {}
