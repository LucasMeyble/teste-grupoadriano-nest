import { ApiProperty } from '@nestjs/swagger';

export class StatisticsDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  sum: number;

  @ApiProperty()
  avg: number;

  @ApiProperty()
  min: number;

  @ApiProperty()
  max: number;
}
