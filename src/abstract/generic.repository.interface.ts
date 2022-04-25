import { ID } from '../types/helper';

export interface GenericRepositoryInterface<T, CDTO, UDTO> {
  create(data: CDTO): Promise<T>;
  delete(id: ID): Promise<boolean>;
  update(id: ID, update: Partial<UDTO>): Promise<T>;
  getById(id: ID): Promise<T>;
  getByKey(key: keyof T, value: any): Promise<T>;
  getAll(): Promise<T[]>;
}
