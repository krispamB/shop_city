import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, RolesGuard } from 'src/common/Guards';
import { RolesDecorator } from 'src/common/decorators';
import { AdminService } from './admin.service';
import { ParamsDto } from './dto';
import { ProfileService } from 'src/profile/profile.service';

@RolesDecorator('ADMIN')
@UseGuards(RolesGuard)
@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private profileService: ProfileService,
  ) {}

  @Get('all_shops')
  getAllShops(@Query('q') query: string) {
    return this.profileService.getAllShops(query);
  }

  @Patch('active/:shop_id')
  setIsActive(@Param() params: ParamsDto) {
    return this.adminService.setIsActive(params.shop_id);
  }

  @Delete('delete-shop/:id')
  deleteShop(@Param('id') shop_id: string) {
    return this.profileService.deleteAccount(shop_id);
  }
}
