import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { CreateTransactionUseCase } from '../../../application/use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from '../../../application/use-cases/delete-transactions.use-case';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase,
  ) {}

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

  @Delete()
  @HttpCode(200)
  deleteAll(): void {
    this.deleteAllTransactionsUseCase.execute();
  }
}
