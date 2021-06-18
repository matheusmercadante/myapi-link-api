export interface PipedriveServiceInterface<T> {
  findAll(apiToken: string, cmd: T): Promise<any>;
  // findOne(apiToken: string, id: number): Promise<any>;
}
