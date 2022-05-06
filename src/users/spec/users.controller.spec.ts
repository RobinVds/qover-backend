import { Test, TestingModule } from '@nestjs/testing';
import { MemoryDataServicesModule } from '../../frameworks/memory/memory.module';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MemoryDataServicesModule],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const data = {
      username: 'username',
      password: 'changeme',
    };

    const createUserDto = new CreateUserDto();
    createUserDto.password = data.password;
    createUserDto.username = data.username;

    const response = new User();
    response.password = await User.hashPassword(data.password);
    response.username = data.username;

    jest.spyOn(service, 'create').mockImplementation(async () => response);

    expect(await controller.create(createUserDto)).toBe(response);
  });

  it('should return an array of users', async () => {
    const data = {
      username: 'username',
      password: 'changeme',
    };

    const response = new User();
    response.password = await User.hashPassword(data.password);
    response.username = data.username;

    jest.spyOn(service, 'findAll').mockImplementation(async () => [response]);

    expect(await controller.findAll()).toEqual([response]);
  });

  it('should find one user by username', async () => {
    const data = {
      username: 'username',
      password: 'changeme',
    };

    const response = new User();
    response.password = await User.hashPassword(data.password);
    response.username = data.username;

    jest
      .spyOn(service, 'findByUsername')
      .mockImplementation(async () => response);

    expect(await controller.findByUsername(data.username)).toBe(response);
  });
});
