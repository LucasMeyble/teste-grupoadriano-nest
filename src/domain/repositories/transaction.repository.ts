import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionRepository {
  abstract save(transaction: Transaction): void;
  abstract clear(): void;
  abstract findAll(): Transaction[];
}
