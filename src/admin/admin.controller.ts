import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard, RolesGuard } from 'src/common/Guards';
import { RolesDecorator } from 'src/common/decorators';

@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  test() {
    return 'This is an admin route';
  }
}
