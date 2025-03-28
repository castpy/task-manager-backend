import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategies';
import { LocalStrategy } from './strategies/local.strategies';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      privateKey: process.env.NEST_JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.NEST_JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthServices, PrismaService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
