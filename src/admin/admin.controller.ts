import { Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard, RolesGuard } from 'src/common/Guards';
import { RolesDecorator } from 'src/common/decorators';
import { AdminService } from './admin.service';
import { ParamsDto } from './dto';

@RolesDecorator('ADMIN')
@UseGuards(RolesGuard)
@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  test() {
    return 'this is an admin route';
  }

  @Patch('active/:shop_id')
  setIsActive(@Param() params: ParamsDto) {
    return this.adminService.setIsActive(params.shop_id);
  }
}
