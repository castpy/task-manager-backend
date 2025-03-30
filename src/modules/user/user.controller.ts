import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserServices } from './user.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserAuthGuard } from '../auth/utils/jwr.auth.guard.utils';
import { Roles, Users } from '@prisma/client';
import { GetUser } from '../auth/decorators/get.user.decorator';
import { UserRoles } from '../auth/decorators/role.decorator';
import { UserDto } from 'src/dtos/user.dto';
import { NewTaskDto } from './dtos/newTask.dtos';
import { PutTaskDto } from './dtos/updateTask.dto';
import { TaskDto } from './dtos/getTasks.dto';
import { ErrorResponseDto } from 'src/dtos/error.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@ApiSecurity('bearer')
@UseGuards(UserAuthGuard)
@UserRoles(Roles.ADMIN, Roles.USER)
@ApiBadRequestResponse({ type: ErrorResponseDto })
@ApiUnauthorizedResponse({ type: ErrorResponseDto })
export class UserController {
  constructor(private readonly userServices: UserServices) {}

  @Get('/me')
  @ApiOkResponse({ type: UserDto })
  async getMe(@GetUser() user: Users) {
    return this.userServices.getMe(user);
  }

  @Get('/tasks')
  @ApiOkResponse({ type: TaskDto, isArray: true })
  async getTasks(@GetUser() user: Users) {
    return this.userServices.getTasks(user);
  }

  @Post('/task')
  @ApiBody({ type: NewTaskDto })
  async newTask(@GetUser() user: Users, @Body() data: NewTaskDto) {
    return this.userServices.newTask(data, user);
  }

  @Put('/task/:id')
  @ApiBody({ type: NewTaskDto })
  @ApiParam({ name: 'id', type: 'string' })
  async putTask(
    @GetUser() user: Users,
    @Body() data: NewTaskDto,
    @Param('id') id: string,
  ) {
    return this.userServices.putTask(data, id, user);
  }

  @Put('/status-task')
  @ApiBody({ type: PutTaskDto })
  async putStatusTask(@GetUser() user: Users, @Body() data: PutTaskDto) {
    return this.userServices.putStatusTask(data, user);
  }

  @Delete('/task/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async deleteTask(@GetUser() user: Users, @Param('id') id: string) {
    return this.userServices.deleteTask(id, user);
  }
}
