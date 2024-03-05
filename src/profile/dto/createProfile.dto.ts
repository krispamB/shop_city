import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsInt()
  @IsNotEmpty()
  shop_number: number;

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
  social_links: string[];
}
