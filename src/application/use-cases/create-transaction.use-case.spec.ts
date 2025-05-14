import { CreateTransactionUseCase } from './create-transaction.use-case';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;
  let repository: TransactionRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      clear: jest.fn(),
      findAll: jest.fn(),
    };
    useCase = new CreateTransactionUseCase(repository);
  });

  it('deve salvar uma transação válida', () => {
    const amount = 100;
    const timestamp = new Date().toISOString();

    useCase.execute(amount, timestamp);

    expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
      amount,
      timestamp: expect.any(Date),
    }));
  });

  it('deve lançar erro se timestamp for do futuro', () => {
    const futureDate = new Date(Date.now() + 10000).toISOString();

    expect(() => {
      useCase.execute(50, futureDate);
    }).toThrow('Transaction timestamp cannot be in the future');
  });
});
