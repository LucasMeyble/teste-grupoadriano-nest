import { IsNumber, IsISO8601, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    example: 123.45,
    description: 'Valor da transação (positivo ou zero)',
  })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: '2025-05-14T12:00:00.000Z',
    description: 'Data e hora no formato ISO 8601 (UTC)',
  })
  @IsISO8601()
  timestamp: string;
}
