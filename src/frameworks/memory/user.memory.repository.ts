import * as crypto from "crypto"
import { ID } from '../../types/helper';
import { GenericRepositoryInterface } from '../../abstract/generic.repository.interface';
import { User } from '../../users/entities/user.entity';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';

export class UserMemoryRepository
  implements GenericRepositoryInterface<User, CreateUserDto, UpdateUserDto>
{
  private _repository: User[];

  constructor(repository: User[]) {
    this._repository = repository;
  }

  getById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  
  getByKey(key: keyof User, value: any): Promise<User> {
    const user = this._repository.find(u => u[key] === value)

    return Promise.resolve(user)    
  }

  create(data: CreateUserDto): Promise<User> {
    const user = new User();

    user._id = data?._id || crypto.randomUUID();
    user.username = data.username;
    user.password = data.password; // Encryption should be handled in the service.

    this._repository.push(user);

    return Promise.resolve(user); 
  }

  async delete(id: ID): Promise<boolean> {
    const newRepository = this._repository.filter(u => u._id !== id)
    if(newRepository.length == this._repository.length) {
      return false
    }

    this._repository = newRepository
    return true
  }

  async update(id: ID, update: Partial<UpdateUserDto>): Promise<User> {
    const toBeUpdated = this._repository.find((user => user._id == id))
    const updated = {...toBeUpdated, ...update}
    return Promise.resolve(updated)
  }

  get(id: ID): Promise<User> {
    return Promise.resolve(this._repository.find(user => user._id == id))
  }
  getAll(): Promise<User[]> {
    return Promise.resolve(this._repository)
  }
}
