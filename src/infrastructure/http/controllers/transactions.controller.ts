import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { CreateTransactionUseCase } from '../../../application/use-cases/create-transaction.use-case';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly createTransactionUseCase: CreateTransactionUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateTransactionDto) {
    try {
      this.createTransactionUseCase.execute(dto.amount, new Date(dto.timestamp));
    } catch (e) {
      if (e.message.includes('future')) {
        throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }
}
