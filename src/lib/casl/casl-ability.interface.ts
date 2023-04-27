import { Profile } from '@prisma/client';
import { Ability } from './casl-ability.type';

export interface ICaslAbilityFactory {
  createAbilityForProfile(profile: Profile): Ability;
}

export const ICaslAbilityFactoryConstant = 'ICaslAbilityFactoryConstant';
