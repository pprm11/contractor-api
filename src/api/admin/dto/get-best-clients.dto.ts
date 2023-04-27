import { Type } from 'class-transformer';
import { IsDate, IsInt, IsPositive, Max, IsOptional } from 'class-validator';

export class GetBestClientsDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  start: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end: Date;

  // To-do add a custom validation decorator to validate the limit and skip
  // To-do add a conf to define the max limit
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(100)
  @Type(() => Number)
  limit = 2;
}
