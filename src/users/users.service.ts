import { Injectable } from '@nestjs/common';
import { IDataServices } from '../abstract/data-services.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: IDataServices,
  ) {}

  async findByUsername(username: string) {
    const response = await this.repository.users.getByKey('username', username);
    return response
  }

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await User.hashPassword(data.password)
    return await this.repository.users.create({...data, password: hashedPassword})
  }

  async findAll(): Promise<User[]> {
    return await this.repository.users.getAll()
  }
}
