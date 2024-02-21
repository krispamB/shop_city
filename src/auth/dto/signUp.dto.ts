import { Category } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  shop_owner: string;

  @IsNotEmpty()
  @IsString()
  shop_name: string;

  @IsNotEmpty()
  @IsString()
  shop_cover_image: string;

  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;
}
