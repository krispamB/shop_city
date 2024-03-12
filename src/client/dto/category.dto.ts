import { Category } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class CategoryDto {
  @IsEnum(Category)
  category: Category;
}
