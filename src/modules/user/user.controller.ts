import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserServices } from './user.service';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from '../auth/utils/jwr.auth.guard.utils';
import { Roles, Users } from '@prisma/client';
import { GetUser } from '../auth/decorators/get.user.decorator';
import { UserRoles } from '../auth/decorators/role.decorator';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@ApiSecurity('bearer')
@UseGuards(UserAuthGuard)
export class UserController {
  constructor(private readonly userServices: UserServices) {}

  @Get('/me')
  @UserRoles(Roles.ADMIN, Roles.USER)
  async getMe(@GetUser() user: Users) {
    return this.userServices.getMe(user);
  }
}
