import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { GenericRepositoryInterface } from './generic.repository.interface';

export abstract class IDataServices {
  abstract users: GenericRepositoryInterface<User, CreateUserDto, UpdateUserDto>;
}
