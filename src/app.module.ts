import { Module } from '@nestjs/common';
import { ContractsModule } from './api/contracts/contracts.module';
import { PrismaModule } from './lib/prisma/prisma.module';
import { JobsModule } from './api/jobs/jobs.module';
import { AdminModule } from './api/admin/admin.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './lib/utils/validation.pipe';
import { ProfileModule } from './lib/profile/profile.module';
import { TransformSerializer } from './lib/utils/transform-serializer.service';

@Module({
  imports: [
    ContractsModule,
    JobsModule,
    AdminModule,
    PrismaModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    TransformSerializer,
  ],
})
export class AppModule {}
