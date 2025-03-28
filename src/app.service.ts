import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new ForbiddenException('Você não tem permisão para isso!');
  }
}
