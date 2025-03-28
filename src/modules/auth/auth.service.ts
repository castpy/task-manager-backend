import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { AuthPayloadDto } from './types/auth.payload';
import { PrismaService } from 'src/prisma.service';
import { Logger } from '@nestjs/common';
import { Decoded } from './types/verifyToken';

@Injectable()
export class AuthServices {
  private readonly logger = new Logger(AuthServices.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async getUserByEmail(email: string): Promise<Users> {
    try {
      const user = await this.prismaService.users.findUnique({
        where: { email },
      });
      if (!user) {
        throw new ForbiddenException(
          `Usuário com email ${email} não encontrado`,
        );
      }
      return user;
    } catch (error) {
      this.logger.error(
        `Falha ao obter usuário pelo email ${email}`,
        error.stack,
      );
      throw error;
    }
  }

  async login(id: string) {
    try {
      const payload: AuthPayloadDto = { id };
      const token = this.jwtService.sign(payload);
      return { token };
    } catch (error) {
      this.logger.error(`Falha no login do usuário ${id}`, error.stack);
      throw error;
    }
  }

  async validateUsers(email: string, password: string): Promise<Users | null> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) return null;
      if (user.authProvider !== 'EMAIL') {
        throw new ForbiddenException(`Faça login com ${user.authProvider}`);
      }
      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) return null;
      return user;
    } catch (error) {
      this.logger.error(
        `Falha na validação do usuário com email ${email}`,
        error.stack,
      );
      throw error;
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded: Decoded = this.jwtService.verify(token, {
        secret: process.env.NEST_JWT_SECRET_KEY,
      });

      if (decoded.id) {
        const user = await this.prismaService.users.findUnique({
          where: { id: decoded.id },
        });
        if (!user) {
          await this.prismaService.users.create({
            data: {
              id: decoded.id,
              email: decoded.email,
              roles: ['USER'],
              authProvider: 'GOOGLE',
              infos: {
                create: {
                  name: decoded.name,
                  avatar: decoded.picture,
                },
              },
            },
          });
        }

        await this.login(decoded.id);
      }

      return { valid: true };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}
