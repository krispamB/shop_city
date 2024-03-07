import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, ProfileService],
})
export class AdminModule {}
