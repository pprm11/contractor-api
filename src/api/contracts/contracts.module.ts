import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { CaslModule } from '../../lib/casl/casl.module';
import { PrismaModule } from '../../lib/prisma/prisma.module';
import { TransformSerializer } from '../../lib/utils/transform-serializer.service';

@Module({
  imports: [CaslModule, PrismaModule],
  controllers: [ContractsController],
  providers: [ContractsService, TransformSerializer],
})
export class ContractsModule {}
