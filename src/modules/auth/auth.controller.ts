import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { AuthBodyDto, AuthOkResponseDto } from './dtos/auth.body.dto';
import { GetUser } from './decorators/get.user.decorator';
import { AuthServices } from './auth.service';
import { ErrorResponseDto } from 'src/dtos/error.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthServices) {}

  @Post('')
  @UseGuards(AuthGuard('user-local'))
  @ApiBody({ type: AuthBodyDto })
  @ApiOkResponse({ type: AuthOkResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  async login(@GetUser() user: Users) {
    return this.authService.login(user.id);
  }

  @Post('verify-token')
  async verifyToken(@Body('token') token: string) {
    return await this.authService.verifyToken(token);
  }
}
