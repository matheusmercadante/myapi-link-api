import { IsNotEmpty } from 'class-validator';

export class QueryParamsDto {
  @IsNotEmpty()
  api_token: string;
}
