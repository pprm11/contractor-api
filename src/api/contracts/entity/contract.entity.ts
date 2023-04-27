import { Contract as ContractModel, ContractStatus } from '@prisma/client';

export class Contract implements ContractModel {
  id: number;

  clientId: number;

  contractorId: number;

  terms: string;

  status: ContractStatus;

  constructor(partial: Partial<Contract>) {
    Object.assign(this, partial);
  }
}
