import { PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects } from '@casl/prisma';
import { Contract, Job, Profile } from '@prisma/client';
import { accessibleBy } from '@casl/prisma';
import { ActionEnum, SubjectsEnum } from './casl-ability.enum';

export type AppAbility = PureAbility<
  [
    ActionEnum,
    Subjects<{
      [SubjectsEnum.Job]: Job;
      [SubjectsEnum.Profile]: Profile;
      [SubjectsEnum.Contract]: Contract;
    }>,
  ],
  PrismaQuery
>;
export class Ability {
  ability: AppAbility;

  constructor(ability: AppAbility) {
    this.ability = ability;
  }
  accessibleByQuery(action: ActionEnum, subject: SubjectsEnum) {
    return accessibleBy(this.ability, action)[subject];
  }
}
