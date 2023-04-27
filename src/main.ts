import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IPrismaServiceConstant } from './lib/prisma/prisma.service.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(IPrismaServiceConstant);
  await prismaService.enableShutdownHooks(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
