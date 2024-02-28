import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards';
import { ProfileService } from './profile.service';
import { GetUser } from 'src/common/decorators';
import { CreateProfileDto } from './dto';
import { Shop } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('create')
  createProfile(@GetUser('id') shop_id: string, @Body() dto: CreateProfileDto) {
    return this.profileService.createProfile(shop_id, dto);
  }

  @Get()
  getProfile(@GetUser() shop: Shop) {
    return this.profileService.getProfile(shop);
  }
}
