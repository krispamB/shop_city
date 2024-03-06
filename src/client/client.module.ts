import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  controllers: [ClientController],
  providers: [ProfileService]
})
export class ClientModule {}
