import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile(shop_id: string, dto: CreateProfileDto) {
    const profileExists: Profile = await this.prisma.profile.findUnique({
      where: {
        shop_id,
      },
    });

    if (profileExists)
      throw new BadRequestException('Profile for your shop already exists');

    const newProfile: Profile = await this.prisma.profile.create({
      data: {
        ...dto,
        shop_id,
      },
    });

    if (!newProfile)
      throw new InternalServerErrorException(
        'an error ocurred while creating profile',
      );

    return {
      statusCode: 201,
      message: 'profile created successfully',
      data: newProfile,
    };
  }

  async getProfile(shop_id: string) {
    const profile: Profile = await this.prisma.profile.findUnique({
      where: {
        shop_id,
      },
    });

    return {
      statusCode: 200,
      message: 'shop profile',
      data: profile,
    };
  }
}
