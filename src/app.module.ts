import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TransactionsController } from './infrastructure/http/controllers/transactions.controller';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.use-case';
import { TransactionRepository } from './domain/repositories/transaction.repository';
import { InMemoryTransactionRepository } from './infrastructure/repositories/in-memory/in-memory-transaction.repository';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './config/logger.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { rateLimitConfig } from './config/rate-limit.config';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    LoggerModule.forRootAsync(loggerConfig),
    ThrottlerModule.forRoot(rateLimitConfig), // Certifique-se de que o rate limit esteja configurado
  ],
  controllers: [TransactionsController],
  providers: [
    CreateTransactionUseCase,
    {
      provide: TransactionRepository,
      useClass: InMemoryTransactionRepository,
    },
    {
      provide: APP_GUARD, // Registra o ThrottlerGuard como guard global
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
