import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { ICaslAbilityFactoryConstant } from './casl-ability.interface';

@Module({
  providers: [
    {
      provide: ICaslAbilityFactoryConstant,
      useClass: CaslAbilityFactory,
    },
  ],
  exports: [
    {
      provide: ICaslAbilityFactoryConstant,
      useClass: CaslAbilityFactory,
    },
  ],
})
export class CaslModule {}
