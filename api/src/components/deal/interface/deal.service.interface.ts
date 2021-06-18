export interface DealServiceInterface {
  findAll(apiToken: string): Promise<any>;
}
