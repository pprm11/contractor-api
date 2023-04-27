import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { CaslModule } from '../../lib/casl/casl.module';
import { PrismaModule } from '../../lib/prisma/prisma.module';
import { TransformSerializer } from '../../lib/utils/transform-serializer.service';
@Module({
  imports: [CaslModule, PrismaModule],
  controllers: [JobsController],
  providers: [JobsService, TransformSerializer],
})
export class JobsModule {}
