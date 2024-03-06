import {
  IsInt,
  IsUrl,
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

  @IsUrl(
    { require_protocol: true },
    { each: true, message: 'Url must be of the the format https://foo.com' },
  )
  @IsArray()
  @IsOptional()
  social_links: string[];
}
