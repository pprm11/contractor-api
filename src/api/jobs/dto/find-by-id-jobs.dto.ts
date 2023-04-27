import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindByIdJobDto {
  @IsNumber()
  @Type(() => Number)
  public id: number;
}
