import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class CreateTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  execute(amount: number, timestamp: Date): void {
    const now = new Date();
    if (timestamp > now) {
      throw new Error('Transaction timestamp cannot be in the future');
    }

    const transaction = new Transaction(amount, timestamp);
    this.repository.save(transaction);
  }
}
