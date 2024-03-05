import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Profile, Shop, Social } from '@prisma/client';
import { URL } from 'url';
import { socialNetworks } from 'src/common/socials';
import { formattedSocials } from './types';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile(shop_id: string, dto: CreateProfileDto) {
    const { social_links, ...goodData } = dto;
    const profileExists: Profile = await this.prisma.profile.findUnique({
      where: {
        shop_id,
      },
    });

    if (profileExists)
      throw new BadRequestException('Profile for your shop already exists');

    const newProfile: Profile = await this.prisma.profile.create({
      data: {
        ...goodData,
        shop_id,
      },
    });

    await this.prisma.social.createMany({
      data: await this.sortSocialLinks(dto.social_links, shop_id),
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

  async getProfile(shop: Shop) {
    const data = {
      shop_owner: shop.shop_owner,
      shop_name: shop.shop_name,
      shop_cover_image: shop.shop_cover_image,
      email: shop.email,
      category: shop.category,
      profile: shop['profile'],
      socials: shop['socials']
    };
    return {
      statusCode: 200,
      message: 'shop profile',
      data,
    };
  }

  async editProfile(profile: Profile, dto: object) {
    if (profile == null) throw new NotFoundException('shop has no profile');

    const updatedProfile: Profile = await this.prisma.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        ...dto,
      },
    });

    if (!updatedProfile)
      throw new InternalServerErrorException(
        'an error ocurred while updating your profile',
      );

    return updatedProfile;
  }

  //util
  async sortSocialLinks(
    socials: string[],
    shop_id: string,
  ): Promise<formattedSocials[]> {
    return socials.map((link) => {  
      const url = new URL(link);

      const social_network = socialNetworks[url.hostname];
      if (!social_network)
        return { social_network: 'Unknown Link', social_url: link, shop_id };

      return { social_network, social_url: link, shop_id };
    });
  }
}
