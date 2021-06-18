import {
  Module,
  HttpModule as BaseHttpModule,
  OnModuleInit,
  HttpService,
  Logger,
} from '@nestjs/common';

@Module({
  imports: [BaseHttpModule],
  exports: [BaseHttpModule],
})
export class HttpModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  public onModuleInit(): any {
    const logger = new Logger('Axios');

    const axios = this.httpService.axiosRef;

    axios.interceptors.request.use((config) => {
      config['metadata'] = { ...config['metadata'], startDate: new Date() };

      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        const { config } = response;

        config['metadata'] = { ...config['metadata'], endDate: new Date() };

        const duration =
          config['metadata'].endDate.getTime() -
          config['metadata'].startDate.getTime();

        logger.log(
          `${config.method.toUpperCase()} ${config.url} ${duration}ms`,
        );

        return response;
      },
      (err) => {
        logger.error(err);

        return Promise.reject(err);
      },
    );
  }
}
