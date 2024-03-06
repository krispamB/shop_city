import { Controller, Get } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';

@Controller('client')
export class ClientController {
  constructor(private profileService: ProfileService) {}

  @Get('active')
  getActiveShops() {
    return this.profileService.getActiveShops()
  }
}
