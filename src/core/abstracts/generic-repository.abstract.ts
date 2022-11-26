import { Pagination } from '../types/pagination';

export abstract class IGenericRepository<T> {
  abstract getAll(paginationQuery: any): Promise<Pagination<T>>;

  abstract get(id: number): Promise<T>;

  abstract create(item: any): Promise<T>;

  abstract update(id: number, item: any): Promise<T>;

  abstract delete(id: number): Promise<boolean>;
}
