import { Test, TestingModule } from "@nestjs/testing"
import { UsersService } from "./users.service"
import { getRepositoryToken } from "@nestjs/typeorm"
import { User } from "./entities/user.entity"
import { randomUUID } from "crypto"
import { Role } from "src/enum/role.enum"

const mockUsersRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  findOneByOrFail: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
}

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
    const repository = module.get(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
  it('should return an array of users', async () => {
    const result = [
      { 
        id: randomUUID(), 
        name: 'Luiz Fardim', 
        email: 'luizao@gmail.com', 
        password: 'abc123@#', 
        birth: '2000-10-09',
        role: Role.User,
        createdAt: new Date(),
        bets: []
      } as User
    ]

    mockUsersRepository.find.mockResolvedValue(result)

    expect(await service.findAll()).toBe(result)
  })
})
})