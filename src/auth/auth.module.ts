import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';

import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { LocalStrategy } from './validators/local.strategy';
import { JwtStrategy } from './validators/jwt.strategy';

if (!process.env.JWT_SECRET) config(); // Config service could not have been instantiated yet so we need to make sure the environment is configured.

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' }, // After 7 days fresh token will be needed, this should be handled by refresh tokens in a production environment
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
