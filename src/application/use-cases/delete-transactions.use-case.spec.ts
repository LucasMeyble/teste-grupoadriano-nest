import { DeleteAllTransactionsUseCase } from './delete-transactions.use-case';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

describe('DeleteAllTransactionsUseCase', () => {
  let useCase: DeleteAllTransactionsUseCase;
  let repository: TransactionRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      clear: jest.fn(),
    };
    useCase = new DeleteAllTransactionsUseCase(repository);
  });

  it('should call repository.clear()', () => {
    useCase.execute();
    expect(repository.clear).toHaveBeenCalledTimes(1);
  });
});
