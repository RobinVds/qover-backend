import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../abstract/data-services.interface';
import { UserMemoryRepository } from './user.memory.repository';

@Injectable()
export class MemoryDataServices
  implements IDataServices {
  users: UserMemoryRepository = new UserMemoryRepository([])
}