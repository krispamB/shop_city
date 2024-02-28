import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';

export class EditProfileDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  phone_number: string;

  @IsOptional()
  @IsInt()
  shop_number: number;

  @IsOptional()
  @IsArray()
  images: string[];

  @IsOptional()
  @IsString()
  shop_location: string;
}
