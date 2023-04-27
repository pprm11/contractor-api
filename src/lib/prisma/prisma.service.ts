import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IPrismaService } from './prisma.service.interface';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, IPrismaService
{
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
