import { Module } from '@nestjs/common';
import { config } from "dotenv"

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongoDataServicesModule } from '../frameworks/mongo/mongo.module';
import { MemoryDataServicesModule } from '../frameworks/memory/memory.module';

if(!process.env.NODE_ENV) config() // Config service could not have been instantiated yet so we need to make sure the environment is configured.

@Module({
  imports: [process.env.NODE_ENV === "test" ? MemoryDataServicesModule : MongoDataServicesModule], 
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }
