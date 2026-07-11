import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { RegisterUserDto } from './dto/register-user.dto';

const mockUsersRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  findOneByOrFail: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockUser = {
  id: randomUUID(),
  name: 'Luiz Fardim',
  email: 'luizfardim@gmail.com',
  createdAt: '2026-07-11T14:38:27.129Z',
  birth: '2000-10-09',
  role: 'user',
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [mockUser];

      mockUsersRepository.find.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    test('should return a user data', async () => {
      const result = mockUser;
      mockUsersRepository.save.mockResolvedValue(result);
      const createUserDto: RegisterUserDto = {
        name: 'Luiz Fardim',
        email: 'luizao@gmail.com',
        password: 'abc123@#',
        birth: '2000-10-09',
      };
      expect(await service.create(createUserDto)).toEqual(result);
    });

    test('should throw ConflictException when email already in use', async () => {
      mockUsersRepository.findOneBy.mockResolvedValue(mockUser);
      const createUserDto: RegisterUserDto = {
        name: 'Luiz Fardim',
        email: 'luizfardim@gmail.com',
        password: 'abc123@#',
        birth: '2000-10-09',
      };
      await expect(service.create(createUserDto)).rejects.toThrow(
        'Email already in use',
      );
    });
  });

  describe('findOne', () => {
    test('should return only one user by ID', async () => {
      const id = randomUUID();
      const result = mockUser;
      mockUsersRepository.findOneBy.mockResolvedValue(result);
      expect(await service.findOne(id)).toEqual(result);
    });

    test('should throw NotFoundException when user not exists', async () => {
      mockUsersRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOne('id-not-exists')).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('findOneByEmail', () => {
    test('should return only one user by email', async () => {
      const email = 'luizfardim@gmail.com';
      const result = mockUser;

      mockUsersRepository.findOneBy.mockResolvedValue(result);

      expect(await service.findByEmail(email)).toEqual(result);
    });
  });
});
