import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { BestClientsSerializer } from './entity/best-clients.entity';
import { BestProfessionSerializer } from './entity/best-profession.entity';
import { GetBestProfessionDto } from './dto/get-best-profession.dto';
import { GetBestClientsDto } from './dto/get-best-clients.dto';
import { TransformSerializer } from '../../lib/utils/transform-serializer.service';

@Controller('admin')
//To-do Add a middleware to handle admin headers
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly transformSerializer: TransformSerializer,
  ) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('best-profession')
  async bestProfession(@Query() query: GetBestProfessionDto) {
    // To-do add admin permissions and pass to service as did in Contract
    const bestProfessions = await this.adminService.bestProfession(
      query.start,
      query.end,
    );
    return this.transformSerializer.transform(
      BestProfessionSerializer,
      bestProfessions,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('best-clients')
  async bestClients(@Query() query: GetBestClientsDto) {
    // To-do add admin permissions and pass to service as did in Contract
    const bestClients = await this.adminService.bestClients(
      query.start,
      query.end,
      query.limit,
    );
    return this.transformSerializer.transform(
      BestClientsSerializer,
      bestClients,
    );
  }
}
