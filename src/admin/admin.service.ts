import { Injectable, NotFoundException } from '@nestjs/common';
import { Shop } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async setIsActive(shop_id: string) {
    const current: Shop = await this.prisma.shop.findUnique({
      where: {
        id: shop_id,
      },
    });

    if (!current)
      throw new NotFoundException('Shop with this id does not exist');

    const update: Shop = await this.prisma.shop.update({
      where: {
        id: shop_id,
      },
      data: {
        is_active: !current.is_active,
      },
    });

    return {
      status: 200,
      message: `is_active was changed from ${current.is_active} to ${update.is_active}`,
    };
  }
}
