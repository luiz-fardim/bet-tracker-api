import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { User } from 'src/users/entities/user.entity';
import { betStatus } from 'src/enum/betStatus.enum';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';

const mockBetsRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
  sum: jest.fn(),
};

const mockUsersRepository = {
  findOneByOrFail: jest.fn(),
};

const mockUser = {
  id: randomUUID(),
  name: 'Luiz Fardim',
  email: 'luizfardim@gmail.com',
};

const mockBet = {
  id: randomUUID(),
  odd: 2.5,
  homeTeam: 'Flamengo',
  visitingTeam: 'Vasco',
  value: 100,
  market: 'Result',
  status: betStatus.PENDING,
  createdAt: new Date('2026-07-11T14:38:27.129Z'),
  profit: 0,
  user: mockUser,
};

describe('BetsService', () => {
  let service: BetsService;

  beforeEach(async () => {
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BetsService,
        {
          provide: getRepositoryToken(Bet),
          useValue: mockBetsRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<BetsService>(BetsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a bet for an existing user', async () => {
      const createBetDto: CreateBetDto = {
        odd: 2.5,
        homeTeam: 'Flamengo',
        visitingTeam: 'Vasco',
        value: 100,
        market: 'Result',
      };
      const savedBet = {
        ...mockBet,
        ...createBetDto,
        user: mockUser,
      };

      mockUsersRepository.findOneByOrFail.mockResolvedValue(mockUser);
      mockBetsRepository.create.mockReturnValue(savedBet);
      mockBetsRepository.save.mockResolvedValue(savedBet);

      const result = await service.create(createBetDto, mockUser.id);

      expect(mockUsersRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: mockUser.id,
      });
      expect(mockBetsRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...createBetDto,
          user: mockUser,
        }),
      );
      expect(mockBetsRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(
        expect.objectContaining({
          odd: createBetDto.odd,
          homeTeam: createBetDto.homeTeam,
          visitingTeam: createBetDto.visitingTeam,
          value: createBetDto.value,
          market: createBetDto.market,
          status: savedBet.status,
          id: savedBet.id,
        }),
      );
    });
  });

  describe('update', () => {
    it('should calculate profit and update status when bet is won', async () => {
      const updateBetDto: UpdateBetDto = { status: betStatus.WON };
      const existingBet = { ...mockBet, value: 100, odd: 2.5, profit: 0 };
      const updatedBet = { ...existingBet, status: betStatus.WON, profit: 150 };

      mockBetsRepository.findOneBy.mockResolvedValue(existingBet);
      mockBetsRepository.save.mockResolvedValue(updatedBet);

      const result = await service.update(
        existingBet.id,
        mockUser.id,
        updateBetDto,
      );

      expect(result.profit).toBe(150);
      expect(result.status).toBe(betStatus.WON);
      expect(mockBetsRepository.save).toHaveBeenCalled();
    });

    it('should set negative profit when bet is lost', async () => {
      const updateBetDto: UpdateBetDto = { status: betStatus.LOST };
      const existingBet = { ...mockBet, value: 100, odd: 2.5, profit: 0 };
      const updatedBet = {
        ...existingBet,
        status: betStatus.LOST,
        profit: -100,
      };

      mockBetsRepository.findOneBy.mockResolvedValue(existingBet);
      mockBetsRepository.save.mockResolvedValue(updatedBet);

      const result = await service.update(
        existingBet.id,
        mockUser.id,
        updateBetDto,
      );

      expect(result.profit).toBe(-100);
      expect(result.status).toBe(betStatus.LOST);
    });

    it('should throw NotFoundException when bet does not exist', async () => {
      mockBetsRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.update('missing-id', mockUser.id, {
          status: betStatus.PENDING,
        }),
      ).rejects.toThrow('Bet is missing');
      expect(mockBetsRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('calculateTotalProfit', () => {
    it('should return the total profit formatted with two decimals', async () => {
      mockBetsRepository.sum.mockResolvedValue(123.456);

      await expect(service.calculateTotalProfit()).resolves.toBe('123.46');
      expect(mockBetsRepository.sum).toHaveBeenCalledWith('profit');
    });
  });

  describe('findOne', () => {
    it('should return one bet for the authenticated user', async () => {
      mockBetsRepository.findOneBy.mockResolvedValue(mockBet);

      await expect(service.findOne(mockBet.id, mockUser.id)).resolves.toEqual(
        mockBet,
      );
      expect(mockBetsRepository.findOneBy).toHaveBeenCalledWith({
        id: mockBet.id,
        user: { id: mockUser.id },
      });
    });

    it('should throw NotFoundException when bet is not found', async () => {
      mockBetsRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne('missing-id', mockUser.id)).rejects.toThrow(
        'Bet not found',
      );
    });
  });

  describe('findAll', () => {
    it('should return bets with pagination and status filter', async () => {
      const result = [mockBet];
      mockBetsRepository.find.mockResolvedValue(result);

      await expect(
        service.findAll(mockUser.id, 10, 2, betStatus.WON),
      ).resolves.toEqual(result);
      expect(mockBetsRepository.find).toHaveBeenCalledWith({
        where: { user: { id: mockUser.id }, status: betStatus.WON },
        take: 10,
        skip: 10,
      });
    });
  });

  describe('remove', () => {
    it('should delete a bet successfully', async () => {
      mockBetsRepository.findOneBy.mockResolvedValue(mockBet);

      await expect(service.remove(mockBet.id, mockUser.id)).resolves.toEqual({
        message: 'Bet deleted successfully',
      });
      expect(mockBetsRepository.delete).toHaveBeenCalledWith(mockBet.id);
    });

    it('should throw NotFoundException when trying to remove a missing bet', async () => {
      mockBetsRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove('missing-id', mockUser.id)).rejects.toThrow(
        'Bet not found',
      );
    });
  });
});
