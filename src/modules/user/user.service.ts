import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Users } from '@prisma/client';

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
}
