import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserServices } from './user.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserAuthGuard } from '../auth/utils/jwr.auth.guard.utils';
import { Roles, Users } from '@prisma/client';
import { GetUser } from '../auth/decorators/get.user.decorator';
import { UserRoles } from '../auth/decorators/role.decorator';
import { UserDto } from 'src/dtos/user.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@ApiSecurity('bearer')
@UseGuards(UserAuthGuard)
export class UserController {
  constructor(private readonly userServices: UserServices) {}

  @Get('/me')
  @ApiOkResponse({ type: UserDto })
  @UserRoles(Roles.ADMIN, Roles.USER)
  async getMe(@GetUser() user: Users) {
    return this.userServices.getMe(user);
  }
}
