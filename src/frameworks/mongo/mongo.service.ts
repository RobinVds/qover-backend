import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from '../../abstract/data-services.interface';
import { User, UserDocument } from '../../schemas/user.schema';
import { MongoRepository } from './mongo.repository';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  users: MongoRepository<User, CreateUserDto, UpdateUserDto>;

  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,
  ) {}

  // Called once all modules have been initialized, but before listening for connections. 
  onApplicationBootstrap() {
    this.users = new MongoRepository<User, CreateUserDto, UpdateUserDto>(this.UserRepository);
  }
}