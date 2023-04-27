import { AbilityBuilder } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { Profile } from '@prisma/client';
import { AppAbility, Ability } from './casl-ability.type';
import { ICaslAbilityFactory } from './casl-ability.interface';
import { attributeBasedAbility } from './attribute-based.ability';

export class CaslAbilityFactory implements ICaslAbilityFactory {
  createAbilityForProfile(profile: Profile): Ability {
    const ablityBuilder = new AbilityBuilder<AppAbility>(createPrismaAbility);
    // To-do Global Layer
    // * Tenant and other rules that apllies to everything

    // Role Based Layer
    // * To-do Implement roles and permissions associated with them

    // User Specific Layer
    // * To-do Implement rules set direct to user

    // Atribute based Layer
    attributeBasedAbility(ablityBuilder, profile);
    return new Ability(ablityBuilder.build());
  }
}
