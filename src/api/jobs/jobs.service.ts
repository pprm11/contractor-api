import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Job, Prisma } from '@prisma/client';
import {
  IPrismaService,
  IPrismaServiceConstant,
} from '../../lib/prisma/prisma.service.interface';
@Injectable()
export class JobsService {
  constructor(@Inject(IPrismaServiceConstant) private prisma: IPrismaService) {}
  readUnpaid(jobWhereInput: Prisma.JobWhereInput): Promise<Job[]> {
    return this.prisma.job.findMany({
      where: jobWhereInput,
      include: {
        contract: {
          include: {
            client: true,
            contractor: true,
          },
        },
      },
    });
  }

  async pay(
    abilityRestricitonsWhereInput: Prisma.JobWhereInput,
    jobId: number,
  ): Promise<Job> {
    const job = await this.prisma.job.findFirst({
      where: {
        AND: [
          abilityRestricitonsWhereInput,
          {
            id: jobId,
          },
        ],
      },
      include: {
        contract: {
          include: {
            client: true,
            contractor: true,
          },
        },
      },
    });
    if (!job) {
      throw new HttpException(`Unpaid Job not found`, HttpStatus.NOT_FOUND);
    }
    const client = job.contract.client;
    if (client.balance < job.price) {
      throw new HttpException(
        `Client has Insufienct Funds`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const contractor = job.contract.contractor;

    await this.prisma.$transaction(async (tx) => {
      const [jobs, clients, contractors] = await Promise.all([
        tx.job.updateMany({
          data: { paid: true, paymentDate: new Date() },
          where: {
            id: job.id,
            paid: false,
          },
        }),
        tx.profile.updateMany({
          data: {
            balance: {
              increment: -1 * job.price,
            },
          },
          where: {
            id: client.id,
            balance: { gte: job.price },
          },
        }),
        tx.profile.updateMany({
          data: {
            balance: {
              increment: job.price,
            },
          },
          where: {
            id: contractor.id,
          },
        }),
      ]);

      if (jobs.count != 1 || clients.count != 1 || contractors.count != 1) {
        throw new HttpException(`Transaction failed`, HttpStatus.CONFLICT);
      }
    });
    return job;
  }
}
