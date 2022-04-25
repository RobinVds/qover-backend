import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config'
import {config} from "dotenv"

import { UsersModule } from '../../users/users.module';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

import { JwtStrategy } from '../validators/jwt.strategy';
import { LocalStrategy } from '../validators/local.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    if(!process.env.JWT_SECRET) config() // Config service could not have been instantiated yet so we need to make sure the environment is configured.

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
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
