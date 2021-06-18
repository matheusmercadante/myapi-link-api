import { IsString, IsNotEmpty } from 'class-validator';

export class CreateConsolidationPipedriveBlingDto {
  @IsNotEmpty()
  @IsString()
  pipedrive_api_token: string;

  @IsNotEmpty()
  @IsString()
  bling_api_token: string;
}
