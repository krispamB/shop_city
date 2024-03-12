import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards';
import { ProfileService } from './profile.service';
import { GetUser } from 'src/common/decorators';
import { CreateProfileDto, EditProfileDto } from './dto';
import { Profile, Shop } from '@prisma/client';

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

  @Patch('edit')
  editProfile(
    @GetUser('profile') profile: Profile,
    @Body() dto: EditProfileDto,
  ) {
    return this.profileService.editProfile(profile, dto);
  }

  @Delete('delete-shop')
  deleteShop(@GetUser() shop: Shop) {
    return this.profileService.deleteAccount(shop.id)
  }
}
