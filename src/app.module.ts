import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    QuoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
