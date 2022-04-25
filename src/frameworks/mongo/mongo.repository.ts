import { ID } from '../../types/helper';
import { Model } from 'mongoose';
import { GenericRepositoryInterface } from '../../abstract/generic.repository.interface';

export class MongoRepository<T, CDTO, UDTO>
  implements GenericRepositoryInterface<T, CDTO, UDTO>
{
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  getById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  
  getByKey(key: keyof T, value: any): Promise<T> {
    //@ts-ignore
    return this._repository.findOne({[key]: value}).exec()
  }

  create(data: CDTO): Promise<T> {
    return this._repository.create(data)
  }

  async delete(id: ID): Promise<boolean> {
    const deleted = (await this._repository.deleteOne({"_id": id}).exec()).acknowledged
    return deleted
  }
  async update(id: ID, update: Partial<UDTO>): Promise<T> {
    return this._repository.findOneAndUpdate({"_id": id, update}).exec()
  }

  get(id: ID): Promise<T> {
    return this._repository.findById(id).exec()
  }
  getAll(): Promise<T[]> {
    return this._repository.find().exec()
  }
}
