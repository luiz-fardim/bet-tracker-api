import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

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
    jest.restoreAllMocks();

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

      await expect(service.findAll()).resolves.toEqual(result);
      expect(mockUsersRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a user and hash the password', async () => {
      const createUserDto: RegisterUserDto = {
        name: 'Luiz Fardim',
        email: 'luizao@gmail.com',
        password: 'abc123@#',
        birth: '2000-10-09',
      };
      const plainPassword = createUserDto.password;
      const savedUser = {
        ...mockUser,
        email: createUserDto.email,
        password: 'hashed-password',
      };
      const bcryptHashMock = bcrypt.hash as jest.Mock;
      bcryptHashMock.mockResolvedValue('hashed-password');

      mockUsersRepository.findOneBy.mockResolvedValue(null);
      mockUsersRepository.create.mockReturnValue(savedUser);
      mockUsersRepository.save.mockResolvedValue(savedUser);

      const result = await service.create(createUserDto);

      expect(bcryptHashMock).toHaveBeenCalledWith(plainPassword, 10);
      expect(mockUsersRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: createUserDto.email,
          password: 'hashed-password',
        }),
      );
      expect(mockUsersRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(
        expect.objectContaining({
          id: mockUser.id,
          email: createUserDto.email,
        }),
      );
      expect(result).not.toHaveProperty('password');
    });

    it('should throw ConflictException when email already in use', async () => {
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
      expect(mockUsersRepository.create).not.toHaveBeenCalled();
      expect(mockUsersRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return only one user by ID', async () => {
      const id = randomUUID();
      const result = mockUser;
      mockUsersRepository.findOneBy.mockResolvedValue(result);

      await expect(service.findOne(id)).resolves.toEqual(result);
      expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({ id });
    });

    it('should throw NotFoundException when user not exists', async () => {
      mockUsersRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne('id-not-exists')).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('findByEmail', () => {
    it('should return only one user by email', async () => {
      const email = 'luizfardim@gmail.com';
      const result = mockUser;

      mockUsersRepository.findOneBy.mockResolvedValue(result);

      await expect(service.findByEmail(email)).resolves.toEqual(result);
      expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({ email });
    });

    it('should throw NotFoundException when email does not exist', async () => {
      mockUsersRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findByEmail('not-found@email.com')).rejects.toThrow(
        'Invalid Credentials',
      );
    });
  });

  describe('update', () => {
    it('should update a user when it exists', async () => {
      const id = randomUUID();
      const updatedUser = { ...mockUser, name: 'Luiz Updated' };

      mockUsersRepository.findOneBy.mockResolvedValue(mockUser);
      mockUsersRepository.save.mockResolvedValue(updatedUser);

      await expect(
        service.update(id, { name: 'Luiz Updated' }),
      ).resolves.toEqual(updatedUser);
      expect(mockUsersRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when user does not exist', async () => {
      mockUsersRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.update('missing-id', { name: 'Luiz Updated' }),
      ).rejects.toThrow('User is missing');
      expect(mockUsersRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete a user successfully', async () => {
      const id = randomUUID();

      await expect(service.remove(id)).resolves.toEqual({
        message: 'User deleted successfully',
      });
      expect(mockUsersRepository.delete).toHaveBeenCalledWith({ id });
    });
  });
});
