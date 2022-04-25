import { ID } from '../../types/helper';

export class CreateUserDto {
  _id?: ID;
  username: string;
  password: string;
}
