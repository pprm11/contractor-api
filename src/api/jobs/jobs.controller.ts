import {
  Controller,
  Post,
  Param,
  Get,
  UseGuards,
  Request,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { FindByIdJobDto } from './dto/find-by-id-jobs.dto';
import { ProfileGuard } from '../../lib/profile/profile.guard';
import { ActionEnum, SubjectsEnum } from '../../lib/casl/casl-ability.enum';
import {
  ICaslAbilityFactory,
  ICaslAbilityFactoryConstant,
} from '../../lib/casl/casl-ability.interface';
import { TransformSerializer } from '../../lib/utils/transform-serializer.service';
import { Job } from './entity/job.entity';

@Controller('jobs')
@UseGuards(ProfileGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class JobsController {
  constructor(
    private readonly transformSerializer: TransformSerializer,
    private readonly jobsService: JobsService,
    @Inject(ICaslAbilityFactoryConstant)
    private readonly caslAbilityFactory: ICaslAbilityFactory,
  ) {}

  @Post(':id/pay')
  async pay(@Param() params: FindByIdJobDto, @Request() req: any) {
    const ability = this.caslAbilityFactory.createAbilityForProfile(
      req.authProfile,
    );
    const job = await this.jobsService.pay(
      ability.accessibleByQuery(ActionEnum.Pay, SubjectsEnum.Job),
      params.id,
    );
    return this.transformSerializer.transform(Job, job)[0];
  }

  @Get('unpaid')
  async readUnpaid(@Request() req: any) {
    const ability = this.caslAbilityFactory.createAbilityForProfile(
      req.authProfile,
    );
    const jobs = await this.jobsService.readUnpaid(
      ability.accessibleByQuery(ActionEnum.ReadUnpaid, SubjectsEnum.Job),
    );
    return this.transformSerializer.transform(Job, jobs);
  }
}
