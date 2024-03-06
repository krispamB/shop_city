import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto, EditProfileDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Profile, Shop, Social } from '@prisma/client';
import { URL } from 'url';
import { socialNetworks } from 'src/common/socials';
import { ActiveShop, formattedSocials } from './types';

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
      socials: shop['socials'],
    };
    return {
      statusCode: 200,
      message: 'shop profile',
      data,
    };
  }

  async editProfile(profile: Profile, dto: EditProfileDto) {
    if (profile == null) throw new NotFoundException('shop has no profile');

    const { social_links, ...data } = dto;

    if (social_links && social_links.length > 0) {
      const sortedSocials = await this.sortSocialLinks(
        social_links,
        profile.shop_id,
      );

      for (const social of sortedSocials) {
        await this.prisma.social.upsert({
          where: {
            shop_id_social_network: {
              shop_id: social.shop_id,
              social_network: social.social_network,
            },
          },
          update: { social_url: social.social_url },
          create: { ...social },
        });
      }
    }

    const updatedProfile: Profile = await this.prisma.profile.update({
      where: {
        id: profile.id,
      },
      data: data,
    });

    if (!updatedProfile)
      throw new InternalServerErrorException(
        'an error ocurred while updating your profile',
      );

    return updatedProfile;
  }

  async getActiveShops() {
    const activeShops = await this.prisma.shop.findMany({
      where: { is_active: true },
      include: {
        profile: true,
      },
    });

    if (activeShops.length < 1) return activeShops;

    let data: ActiveShop[] = [];
    for (const shop of activeShops) {
      if (!shop.profile)
        data.push({
          description: 'No description yet',
          shop_name: shop.shop_name,
          date: shop.created_at,
          shop_cover_image: shop.shop_cover_image,
          category: shop.category,
          shop_id: shop.id,
        });
      else
        data.push({
          description: shop.profile.description,
          shop_name: shop.shop_name,
          date: shop.created_at,
          shop_cover_image: shop.shop_cover_image,
          category: shop.category,
          shop_id: shop.id,
        });
    }

    return data;
  }

  async getShopDetails(shop_id: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { id: shop_id },
      include: {
        profile: true,
        socials: true,
      },
    });

    if (!shop) throw new NotFoundException('Shop does not exist');

    const { hash, ...safeData } = shop;

    return safeData;
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
