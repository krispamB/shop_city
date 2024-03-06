import { IsNotEmpty, IsString } from 'class-validator';

export class ParamsDto {
  @IsString()
  @IsNotEmpty()
  shop_id: string;
}
