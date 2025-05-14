import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable()
export class DeleteAllTransactionsUseCase {
  constructor(
    private readonly repository: TransactionRepository,
  ) {}

  execute(): void {
    this.repository.clear();
  }
}
