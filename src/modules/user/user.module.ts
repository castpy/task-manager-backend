import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './user.controller';
import { UserServices } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.NEST_JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.NEST_JWT_EXPIRES_IN },
    }),
  ],
  controllers: [UserController],
  providers: [PrismaService, UserServices],
})
export class UserModule {}
