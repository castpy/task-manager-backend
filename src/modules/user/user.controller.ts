import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserServices } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserAuthGuard } from '../auth/utils/jwr.auth.guard.utils';
import { Roles, Users } from '@prisma/client';
import { GetUser } from '../auth/decorators/get.user.decorator';
import { UserRoles } from '../auth/decorators/role.decorator';
import { UserDto } from 'src/dtos/user.dto';
import { NewTaskDto } from './dtos/newTask.dtos';
import { PutTaskDto } from './dtos/updateTask.dto';

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

  @Get('/tasks')
  @UserRoles(Roles.ADMIN, Roles.USER)
  async getTasks(@GetUser() user: Users) {
    return this.userServices.getTasks(user);
  }

  @Post('/task')
  @ApiBody({ type: NewTaskDto })
  @UserRoles(Roles.ADMIN, Roles.USER)
  async newTask(@GetUser() user: Users, @Body() data: NewTaskDto) {
    return this.userServices.newTask(data, user);
  }

  @Put('/task')
  @ApiBody({ type: PutTaskDto })
  @UserRoles(Roles.ADMIN, Roles.USER)
  async putTask(@GetUser() user: Users, @Body() data: PutTaskDto) {
    return this.userServices.putTask(data, user);
  }
}
