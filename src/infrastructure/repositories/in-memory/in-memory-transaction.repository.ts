import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';

export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[] = [];

  save(transaction: Transaction): void {
    this.transactions.push(transaction);
  }
  
  findAll(): Transaction[] {
    return this.transactions;
  }

  clear(): void {
    this.transactions = [];
  }
}
