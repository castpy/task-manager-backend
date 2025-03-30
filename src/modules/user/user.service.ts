import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Users } from '@prisma/client';
import { NewTask } from './types/newTask';
import { Task } from 'src/@types/task';

@Injectable()
export class UserServices {
  private readonly logger = new Logger(UserServices.name);

  constructor(private readonly prisma: PrismaService) {}

  async getMe(user: Users) {
    try {
      const userLocal = await this.prisma.users.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          email: true,
          infos: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      });

      if (!userLocal) {
        throw new NotFoundException(`Usuário não encontrado`);
      }

      return userLocal;
    } catch (error) {
      this.logger.error(`Falha ao obter usuário ${user.id}`, error.stack);
      throw error;
    }
  }

  async newTask(data: NewTask, user: Users) {
    const { title, description, status } = data;
    try {
      const localUser = await this.prisma.users.findFirst({
        where: {
          id: user.id,
        },
      });

      if (!localUser) {
        throw new ForbiddenException('Usuário sem permisão!');
      }

      await this.prisma.tasks.create({
        data: {
          title,
          status,
          description,
          date_to: data.date.to,
          date_from: data.date.from,
        },
      });
    } catch (error) {
      this.logger.error(`Falha ao criar uma tarefa`, error.stack);
      throw error;
    }
  }

  async getTasks(user: Users): Promise<Task[]> {
    try {
      const localUser = await this.prisma.users.findFirst({
        where: {
          id: user.id,
        },
      });

      if (!localUser) {
        throw new ForbiddenException('Usuário sem permisão!');
      }

      const data = await this.prisma.tasks.findMany();

      const tasks: Task[] = data.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        date_from: task.date_from.toISOString(),
        date_to: task.date_to.toISOString(),
        status: task.status,
      }));

      return tasks;
    } catch (error) {
      this.logger.error(`Falha ao buscar tasks`, error.stack);
      throw error;
    }
  }

  async putTask(data: { id: string; status: string }, user: Users) {
    try {
      const localUser = await this.prisma.users.findFirst({
        where: {
          id: user.id,
        },
      });

      if (!localUser) {
        throw new ForbiddenException('Usuário sem permisão!');
      }

      try {
        await this.prisma.tasks.update({
          where: { id: data.id },
          data: {
            status: data.status,
          },
        });
      } catch {
        throw new BadRequestException('Erro ao atualizar task!');
      }
    } catch (error) {
      this.logger.error(`Falha ao atualizar task`, error.stack);
      throw error;
    }
  }
}
