import { Module } from '@nestjs/common';
import { ProfileGuard } from './profile.guard';
import { PrismaModule } from '../../lib/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProfileGuard],
  exports: [ProfileGuard],
})
export class ProfileModule {}
