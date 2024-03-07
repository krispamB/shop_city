import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';

@Controller('client')
export class ClientController {
  constructor(private profileService: ProfileService) {}

  @Get('active')
  getActiveShops(@Query('q') query: string) {
    return this.profileService.getActiveShops(query);
  }

  @Get('shop_details/:shop_id')
  getShopDetails(@Param('shop_id') shop_id: string) {
    return this.profileService.getShopDetails(shop_id);
  }
}
