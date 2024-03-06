import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

   async createAdmin() {
    return this.$transaction([
      this.shop.create({
        data: {
          email: this.config.get<string>(`ADMIN_EMAIL`),
          hash: await argon.hash(this.config.get<string>(`ADMIN_PASSWORD`)),
          shop_name: `ADMIN`,
          shop_owner: `ADMIN`,
          shop_cover_image: `https://res.cloudinary.com/dnpvndlmy/image/upload/v1709729907/admin_z5leps.jpg`,
          role: `ADMIN`,
        },
      }),
    ]);
  }
}
