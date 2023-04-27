import { Job as JobModel } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

export class Job implements JobModel {
  id: number;

  title: string;

  description: string;

  //To-do refactor this to avoid repetition
  @Transform(({ value }) => ({ amount: value / 10000, currency_code: 'USD' }))
  price: number;

  paymentDate: Date;

  paid: boolean;

  @Exclude()
  contractId: number;

  @Exclude()
  contract: {
    id: number;
    terms: string;
    clientId: number;
    contractorId: number;
    client: {
      id: number;
      firstName: string;
      lastName: string;
      profession: string;
      balance: number;
    };
    contractor: {
      id: number;
      firstName: string;
      lastName: string;
      profession: string;
      balance: number;
    };
  };

  constructor(partial: Partial<Job>) {
    Object.assign(this, partial);
  }
}
