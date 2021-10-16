import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AppService } from 'src/app.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AppService') private readonly appService: AppService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    return this.appService.login(email, password);
  }
}
