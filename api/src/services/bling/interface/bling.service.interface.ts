export interface BlingServiceInterface<T> {
  findAll(apiToken: string, cmd: T): Promise<any>;
  findOne(apiToken: string, cmd: T, id: number): Promise<any>;
  create(apiToken: string, cmd: T, data: any): Promise<any>;
}
