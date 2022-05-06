import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';

import { UsersModule } from '../../users/users.module';
import { AuthService } from '../auth.service';
import { JwtStrategy } from '../validators/jwt.strategy';
import { LocalStrategy } from '../validators/local.strategy';
import { UsersService } from '../../users/users.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';

if (!process.env.JWT_SECRET) config(); // Config service could not have been instantiated yet so we need to make sure the environment is configured.

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

  const MOCK_USER = {
    username: 'John',
    password: 'changeme',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        ConfigModule.forRoot(),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '60s' }, // After 60 seconds a fresh token will be needed. We should put this in configuration and rethink the way refreshment tokens are handled.
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user for login', async () => {
    const userData = new CreateUserDto();
    userData.password = MOCK_USER.password;
    userData.username = MOCK_USER.username;
    await userService.create(userData);

    const response = await service.validateUser(
      MOCK_USER.username,
      MOCK_USER.password,
    );

    expect(response.username).toBeDefined();
  });

  it('should NOT validate user for login', async () => {
    const response = await service.validateUser('iDoNotExist', 'iDoNotExist');
    expect(response).toBeUndefined();
  });
});
