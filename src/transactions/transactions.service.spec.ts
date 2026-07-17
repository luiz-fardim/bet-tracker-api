import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { AssetTypeEnum } from 'src/enum/assetType.enum';
import { TransactionStatusEnum } from 'src/enum/transactionStatus.enum';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

const mockTransactionsRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
};

const mockUsersRepository = {
  findOneByOrFail: jest.fn(),
};

const mockUser = {
  id: randomUUID(),
  name: 'Luiz Fardim',
  email: 'luizfardim@gmail.com',
};

const mockTransaction = {
  id: randomUUID(),
  assetName: 'PETR4',
  assetType: AssetTypeEnum.STOCK,
  broker: 'Nubank',
  quantity: 10,
  buyPrice: 20.5,
  sellPrice: null,
  fees: 0,
  status: TransactionStatusEnum.OPEN,
  profit: null,
  createdAt: new Date('2026-07-11T14:38:27.129Z'),
  updatedAt: new Date('2026-07-11T14:38:27.129Z'),
  user: mockUser,
};

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockTransactionsRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a transaction for an existing user', async () => {
      const createTransactionDto: CreateTransactionDto = {
        assetName: 'PETR4',
        assetType: AssetTypeEnum.STOCK,
        broker: 'Nubank',
        quantity: 10,
        buyPrice: 20.5,
        fees: 0,
      };
      const savedTransaction = {
        ...mockTransaction,
        ...createTransactionDto,
        user: mockUser,
      };

      mockUsersRepository.findOneByOrFail.mockResolvedValue(mockUser);
      mockTransactionsRepository.create.mockReturnValue(savedTransaction);
      mockTransactionsRepository.save.mockResolvedValue(savedTransaction);

      const result = await service.create(createTransactionDto, mockUser.id);

      expect(mockUsersRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: mockUser.id,
      });
      expect(mockTransactionsRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...createTransactionDto,
          user: mockUser,
        }),
      );
      expect(mockTransactionsRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(
        expect.objectContaining({
          assetName: createTransactionDto.assetName,
          assetType: createTransactionDto.assetType,
          quantity: createTransactionDto.quantity,
          buyPrice: createTransactionDto.buyPrice,
          status: savedTransaction.status,
          id: savedTransaction.id,
        }),
      );
    });
  });

  describe('update', () => {
    it('should calculate profit and update status when transaction is closed', async () => {
      const updateTransactionDto: UpdateTransactionDto = {
        status: TransactionStatusEnum.CLOSED,
        sellPrice: 23,
      };
      const existingTransaction = {
        ...mockTransaction,
        buyPrice: 20,
        quantity: 10,
        fees: 2,
        profit: null,
      };
      const updatedTransaction = {
        ...existingTransaction,
        status: TransactionStatusEnum.CLOSED,
        sellPrice: 23,
        profit: 228,
      };

      mockTransactionsRepository.findOneBy.mockResolvedValue(
        existingTransaction,
      );
      mockTransactionsRepository.save.mockResolvedValue(updatedTransaction);

      const result = await service.update(
        existingTransaction.id,
        mockUser.id,
        updateTransactionDto,
      );

      expect(result.profit).toBe(228);
      expect(result.status).toBe(TransactionStatusEnum.CLOSED);
      expect(mockTransactionsRepository.save).toHaveBeenCalled();
    });

    it('should set profit to null when transaction stays open', async () => {
      const updateTransactionDto: UpdateTransactionDto = {
        status: TransactionStatusEnum.OPEN,
      };
      const existingTransaction = { ...mockTransaction, profit: 10 };
      const updatedTransaction = {
        ...existingTransaction,
        status: TransactionStatusEnum.OPEN,
        profit: null,
      };

      mockTransactionsRepository.findOneBy.mockResolvedValue(
        existingTransaction,
      );
      mockTransactionsRepository.save.mockResolvedValue(updatedTransaction);

      const result = await service.update(
        existingTransaction.id,
        mockUser.id,
        updateTransactionDto,
      );

      expect(result.profit).toBeNull();
      expect(result.status).toBe(TransactionStatusEnum.OPEN);
    });
  });

  describe('getSummary', () => {
    it('should return invested amount, total profit and roi', async () => {
      mockTransactionsRepository.find.mockResolvedValue([
        {
          ...mockTransaction,
          quantity: 10,
          buyPrice: 20,
          profit: 100,
          status: TransactionStatusEnum.CLOSED,
        },
        {
          ...mockTransaction,
          quantity: 5,
          buyPrice: 30,
          profit: null,
          status: TransactionStatusEnum.OPEN,
        },
      ]);

      await expect(service.getSummary(mockUser.id)).resolves.toEqual({
        totalInvested: 350,
        totalProfit: 100,
        roi: 0.2857,
      });
    });
  });
});
