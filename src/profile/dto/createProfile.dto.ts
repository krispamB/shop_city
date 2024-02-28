import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsInt()
  shop_number: number;

  @IsArray()
  images: string[];

  @IsOptional()
  @IsString()
  shop_location: string;
}
