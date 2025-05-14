import { GetStatisticsUseCase } from './get-statistics.use-case';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

describe('GetStatisticsUseCase', () => {
  let useCase: GetStatisticsUseCase;
  let repository: TransactionRepository;
  const fixedNow = new Date('2025-05-14T12:00:00.000Z');

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(fixedNow);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      clear: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new GetStatisticsUseCase(repository);
  });

  it('deve retornar estatísticas com base nas transações dos últimos 60 segundos', () => {
    const transactions = [
      new Transaction(100, new Date(fixedNow.getTime() - 10_000)),
      new Transaction(200, new Date(fixedNow.getTime() - 20_000)),
      new Transaction(300, new Date(fixedNow.getTime() - 30_000)),
    ];

    jest.spyOn(repository, 'findAll').mockReturnValue(transactions);

    const result = useCase.execute();

    expect(result).toEqual({
      count: 3,
      sum: 600,
      avg: 200,
      min: 100,
      max: 300,
    });
  });

  it('deve ignorar transações com mais de 60 segundos', () => {
    const tooOld = new Date(fixedNow.getTime() - 61_000);

    jest.spyOn(repository, 'findAll').mockReturnValue([new Transaction(500, tooOld)]);

    const result = useCase.execute();

    expect(result).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });
});

