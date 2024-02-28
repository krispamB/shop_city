import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import { Shop } from '@prisma/client';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: SignUpDto) {
    const shopExists: Shop = await this.prisma.shop.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (shopExists) throw new BadRequestException('shop already exists');

    const hash: string = await argon.hash(dto.password);
    delete dto['password'];

    const newShop: Shop = await this.prisma.shop.create({
      data: { ...dto, hash },
    });

    return newShop;
  }

  async signIn(dto: SignInDto) {
    const shopExists: Shop = await this.prisma.shop.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (shopExists === null)
      throw new UnauthorizedException('sign up credentials provided are wrong');

    if (!(await argon.verify(shopExists.hash, dto.password)))
      throw new UnauthorizedException(`sign up credentials provided are wrong`);

    return {
      statusCode: 200,
      message: `user sign up successfully`,
      data: {
        access_token: await this.signToken(shopExists.id, shopExists.email),
      },
    };
  }

  private async signToken(id: string, email: string): Promise<string> {
    const payload = {
      sub: id,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EXP_TIME'),
      secret: this.config.get('JWT_SECRET_KEY'),
    });

    return token;
  }
}
