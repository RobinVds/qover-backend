import { Test, TestingModule } from '@nestjs/testing';
import { MemoryDataServicesModule } from '../../frameworks/memory/memory.module';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MemoryDataServicesModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const data = new CreateUserDto();
    data.username = 'TestUser';
    data.password = 'TestPassword';

    const response = await service.create(data);

    expect(response.username).toBe(data.username);
    expect(await bcrypt.compare(data.password, response.password)).toBeTruthy();
  });

  it('should find a user by his username', async () => {
    const data = new CreateUserDto();
    data.username = 'TestUser';
    data.password = 'TestPassword';

    const createdUser = await service.create(data);
    const foundUser = await service.findByUsername(data.username);
    expect(createdUser).toEqual(foundUser);
  });

  it('should return all users', async () => {
    const data = new CreateUserDto();
    data.username = 'TestUser';
    data.password = 'TestPassword';

    const createdUser = await service.create(data);
    const foundUsers = await service.findAll();
    expect([createdUser]).toEqual(foundUsers);
  });
});
