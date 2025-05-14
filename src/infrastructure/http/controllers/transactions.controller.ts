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
  Get,
} from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { CreateTransactionUseCase } from '../../../application/use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from '../../../application/use-cases/delete-transactions.use-case';
import { StatisticsDto } from '../dtos/statistics.dto';
import { GetStatisticsUseCase } from 'src/application/use-cases/get-statistics.use-case';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase,
    private readonly getStatisticsUseCase: GetStatisticsUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({ status: 201, description: 'Transação criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'JSON malformado.' })
  @ApiResponse({ status: 422, description: 'Timestamp no futuro ou amount negativo.' })
  create(@Body() dto: CreateTransactionDto) {
    try {
      this.createTransactionUseCase.execute(dto.amount, dto.timestamp);
    } catch (e) {
      if (e.message.includes('future')) {
        throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Todas as transações foram apagadas com sucesso.' })
  deleteAll(): void {
    this.deleteAllTransactionsUseCase.execute();
  }
  
  @Get('statistics')
  @ApiResponse({
    status: 200,
    description: 'Estatísticas das transações dos últimos 60 segundos.',
    type: StatisticsDto,
  })
  getStatistics(): StatisticsDto {
    return this.getStatisticsUseCase.execute();
  }
}
