import { JobsService } from './jobs.service';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { IPrismaServiceConstant } from '../../lib/prisma/prisma.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('JobService', () => {
  let service: JobsService;
  let prismaMock;
  let prismaService;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaService>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        { provide: IPrismaServiceConstant, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    prismaService = module.get<PrismaService>(IPrismaServiceConstant);
  });

  describe('pay', () => {
    it('Should throw when job not found', async () => {
      // Arrange
      prismaService.job.findFirst.mockResolvedValue(null);

      // Act
      const pay = service.pay({ id: 1 }, 1);

      // Assert
      expect(pay).rejects.toThrow(
        new HttpException(`Unpaid Job not found`, HttpStatus.NOT_FOUND),
      );
    });

    it('Should throw when Client has not enough balance', async () => {
      // Arrange
      const bigPrice = 10000000;
      const lowBalance = 1;
      const job = {
        price: bigPrice,
        contract: {
          client: {
            balance: lowBalance,
          },
        },
      };
      prismaService.job.findFirst.mockResolvedValue(job);

      // Act
      const pay = service.pay({ id: 1 }, 1);

      // Assert
      expect(pay).rejects.toThrow(
        new HttpException(
          `Client has Insufienct Funds`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
      );
    });
  });
});
