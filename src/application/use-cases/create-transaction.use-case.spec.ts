import { CreateTransactionUseCase } from './create-transaction.use-case';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;
  let repository: TransactionRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
    };
    useCase = new CreateTransactionUseCase(repository);
  });

  it('deve salvar uma transação válida', () => {
    const amount = 100;
    const timestamp = new Date();

    useCase.execute(amount, timestamp);

    expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
      amount,
      timestamp,
    }));
  });

  it('deve lançar erro se timestamp for do futuro', () => {
    const futureDate = new Date(Date.now() + 10000); // +10s

    expect(() => {
      useCase.execute(50, futureDate);
    }).toThrow('Transaction timestamp cannot be in the future');
  });
});
