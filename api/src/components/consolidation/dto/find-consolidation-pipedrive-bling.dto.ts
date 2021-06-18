import { IsString, IsNotEmpty } from 'class-validator';

export class QueryParamsDto {
  @IsNotEmpty()
  @IsString()
  report?: string;
}
