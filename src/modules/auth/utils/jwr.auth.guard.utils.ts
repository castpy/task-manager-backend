import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../decorators/role.decorator';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {
    super();
  }

  async getUserById(id: string) {
    try {
      const user = await this.prismaService.users.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          roles: true,
          authProvider: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async canActivate(context: ExecutionContext) {
    try {
      const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) throw new UnauthorizedException('Token não fornecido');

      let decoded: any;
      try {
        decoded = this.jwtService.verify(token, {
          secret: process.env.NEST_JWT_SECRET_KEY,
        });
      } catch {
        throw new UnauthorizedException('Você precisa estar autenticado!');
      }

      const user = await this.getUserById(decoded.id);
      request.user = user;

      if (!roles) return true;

      if (!user || !user.roles.some((role) => roles.includes(role))) {
        throw new UnauthorizedException('Não autorizado');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
