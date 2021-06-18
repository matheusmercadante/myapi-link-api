export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;

  // findOneById(id: number): Promise<T>;

  findAll(): Promise<T[]>;
}
