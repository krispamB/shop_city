import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ProfileModule } from './profile/profile.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    CloudinaryModule,
    ProfileModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
