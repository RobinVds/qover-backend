import { ID } from '../../types/helper';
import * as bcrypt from "bcrypt"
import {IsAlphanumeric, IsNotEmpty} from "class-validator"
export class User {
  _id?: ID;
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  password: string;

  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }
}
