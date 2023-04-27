import { AbilityBuilder } from '@casl/ability';
import { ContractStatus, Profile } from '@prisma/client';
import { AppAbility } from './casl-ability.type';
import { ActionEnum, SubjectsEnum } from './casl-ability.enum';

export function attributeBasedAbility(
  ablityBuilder: AbilityBuilder<AppAbility>,
  profile: Profile,
) {
  const { can, cannot } = ablityBuilder;
  /*
    Read Unpaid Jobs
     * A profile can read unpaid jobs if he is the client or contractor
     * A profile cannot read unpaid jobs from inactive contracts
     * A profile cannot be read a unpaid if it is already paid(By definition)
    */
  can(ActionEnum.ReadUnpaid, SubjectsEnum.Job, {
    OR: [
      { contract: { contractorId: profile.id } },
      { contract: { clientId: profile.id } },
    ],
  });

  cannot(ActionEnum.ReadUnpaid, SubjectsEnum.Job, {
    contract: {
      status: { in: [ContractStatus.TERMINATED, ContractStatus.NEW] },
    },
  });
  cannot(ActionEnum.ReadUnpaid, SubjectsEnum.Job, { paid: true });

  /* Pay a job
   * A profile can pay only a job he is the client
   * A profile cannot pay a job if it is already paid(By definition)
   */
  can(ActionEnum.Pay, SubjectsEnum.Job, {
    contract: { clientId: profile.id },
  });
  cannot(ActionEnum.Pay, SubjectsEnum.Job, { paid: true });

  /* Pay a job
   * A profile can read details of a Contract if he is the client or contractor
   */
  can(ActionEnum.ReadById, SubjectsEnum.Contract, {
    OR: [{ contractorId: profile.id }, { clientId: profile.id }],
  });

  /* Pay a job
   * A profile can read a Contract if he is the client or contractor
   * A profile cannot read a Contract if it is terminated
   */
  can(ActionEnum.Read, SubjectsEnum.Contract, {
    OR: [{ contractorId: profile.id }, { clientId: profile.id }],
  });
  cannot(ActionEnum.Read, SubjectsEnum.Contract, {
    status: ContractStatus.TERMINATED,
  });
}
