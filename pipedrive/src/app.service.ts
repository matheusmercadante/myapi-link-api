import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getAll(token: string): Promise<AxiosResponse<any>> {
    try {
      const dealsResponse = await this.httpService
        .get('https://api.pipedrive.com/v1/deals', {
          params: { status: 'won', api_token: token },
        })
        .toPromise();

      return dealsResponse.data;
    } catch (error) {
      return error;
    }
  }
}
