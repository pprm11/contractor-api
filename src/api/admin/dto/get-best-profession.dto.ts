import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class GetBestProfessionDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  start: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end: Date;
  // To-do add skip and limit
}
