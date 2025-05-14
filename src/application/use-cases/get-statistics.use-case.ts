import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { StatisticsDto } from '../../infrastructure/http/dtos/statistics.dto';

@Injectable()
export class GetStatisticsUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  execute(): StatisticsDto {
    const now = Date.now();
    const sixtySecondsAgo = now - 60_000;

    const transactions = this.repository
      .findAll()
      .filter((t) => t.timestamp.getTime() >= sixtySecondsAgo);

    const count = transactions.length;
    const sum = transactions.reduce((acc, t) => acc + t.amount, 0);
    const avg = count > 0 ? sum / count : 0;
    const min = count > 0 ? Math.min(...transactions.map((t) => t.amount)) : 0;
    const max = count > 0 ? Math.max(...transactions.map((t) => t.amount)) : 0;

    return { count, sum, avg, min, max };
  }
}
