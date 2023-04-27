import { Inject, Injectable } from '@nestjs/common';
import { ProfileType } from '@prisma/client';
import {
  IPrismaService,
  IPrismaServiceConstant,
} from '../../lib/prisma/prisma.service.interface';

@Injectable()
export class AdminService {
  constructor(@Inject(IPrismaServiceConstant) private prisma: IPrismaService) {}
  async bestProfession(start: Date, end: Date) {
    return this.prisma.profileJobsView.groupBy({
      by: ['profession'],
      where: {
        AND: [
          {
            type: ProfileType.CONTRACTOR,
          },
          {
            paymentDate: {
              ...(start ? { gte: new Date(start) } : {}),
              ...(end ? { lt: new Date(end) } : {}),
            },
          },
        ],
      },
      _sum: {
        price: true,
      },
      orderBy: {
        _sum: {
          price: 'desc',
        },
      },
    });
  }

  async bestClients(start: Date, end: Date, limitInput) {
    return this.prisma.profileJobsView.groupBy({
      by: ['firstName', 'lastName'],
      where: {
        AND: [
          {
            type: ProfileType.CLIENT,
          },
          {
            paymentDate: {
              ...(start ? { gte: start } : {}),
              ...(end ? { lt: end } : {}),
            },
          },
        ],
      },
      _sum: {
        price: true,
      },
      orderBy: {
        _sum: {
          price: 'desc',
        },
      },
      ...(limitInput ? { take: limitInput } : {}),
    });
  }
}
