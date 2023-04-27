import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../../lib/prisma/prisma.module';
import { TransformSerializer } from '../../lib/utils/transform-serializer.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [AdminService, TransformSerializer],
})
export class AdminModule {}
