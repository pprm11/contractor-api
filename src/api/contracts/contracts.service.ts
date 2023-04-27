import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { Contract, Prisma } from '@prisma/client';
import { IPrismaServiceConstant } from '../../lib/prisma/prisma.service.interface';

@Injectable()
export class ContractsService {
  constructor(@Inject(IPrismaServiceConstant) private prisma: PrismaService) {}
  findAll(abilityWhereInput: Prisma.ContractWhereInput): Promise<Contract[]> {
    return this.prisma.contract.findMany({
      where: abilityWhereInput,
    });
  }

  findOne(
    abilityWhereInput: Prisma.ContractWhereInput,
    id: number,
  ): Promise<Contract> {
    return this.prisma.contract.findFirst({
      where: {
        AND: [
          abilityWhereInput,
          {
            id: id,
          },
        ],
      },
    });
  }
}
