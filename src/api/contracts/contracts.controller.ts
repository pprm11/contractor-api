import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { FindByIdContractsDto } from './dto/find-by-id-contracts.dto';
import { ProfileGuard } from '../../lib/profile/profile.guard';
import { ActionEnum, SubjectsEnum } from '../../lib/casl/casl-ability.enum';
import {
  ICaslAbilityFactory,
  ICaslAbilityFactoryConstant,
} from '../../lib/casl/casl-ability.interface';
import { TransformSerializer } from '../../lib/utils/transform-serializer.service';
import { Contract } from './entity/contract.entity';

@Controller('contracts')
@UseGuards(ProfileGuard)
export class ContractsController {
  constructor(
    private readonly contractsService: ContractsService,
    private readonly transformSerializer: TransformSerializer,
    @Inject(ICaslAbilityFactoryConstant)
    private readonly caslAbilityFactory: ICaslAbilityFactory,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Request() req: any): Promise<Contract[]> {
    const ability = this.caslAbilityFactory.createAbilityForProfile(
      req.authProfile,
    );
    const contracts = await this.contractsService.findAll(
      ability.accessibleByQuery(ActionEnum.Read, SubjectsEnum.Contract),
    );
    return this.transformSerializer.transform(Contract, contracts);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(
    @Param() params: FindByIdContractsDto,
    @Request() req: any,
  ): Promise<Contract> {
    const ability = this.caslAbilityFactory.createAbilityForProfile(
      req.authProfile,
    );
    const contract = await this.contractsService.findOne(
      ability.accessibleByQuery(ActionEnum.ReadById, SubjectsEnum.Contract),
      params.id,
    );
    return this.transformSerializer.transform(Contract, contract)[0];
  }
}
