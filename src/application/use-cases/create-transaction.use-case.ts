import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class CreateTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  execute(amount: number, timestamp: string): void {
    const transactionDate = new Date(timestamp);

    if (transactionDate > new Date()) {
      throw new Error('Transaction timestamp cannot be in the future');
    }

    if (amount < 0) {
      throw new Error('Transaction amount cannot be negative');
    }

    const transaction = new Transaction(amount, transactionDate);
    this.repository.save(transaction);
  }
}