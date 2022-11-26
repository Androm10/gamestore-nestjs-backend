import { IsInt, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsInt()
  @Min(0)
  @Max(20)
  limit: number;

  @IsInt()
  @Min(0)
  page: number;
}
