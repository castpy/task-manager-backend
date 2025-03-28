import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthServices } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'user-local') {
  constructor(private readonly authServices: AuthServices) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    try {
      const user = await this.authServices.validateUsers(email, password);
      if (!user) throw new UnauthorizedException('Email ou senha inválidos');
      return user;
    } catch (e) {
      throw e;
    }
  }
}
