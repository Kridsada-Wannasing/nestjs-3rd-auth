import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserResponse } from './utils/user-interface';
import { hash, compare } from 'bcrypt';
import { AuthRequest } from './utils/request-interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  private users: User[] = [
    {
      id: 1,
      email: 'test',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
    },
  ];

  constructor(private jwtService: JwtService) {}

  getHello(): string {
    return 'Hello World!';
  }

  googleLogin(req: AuthRequest) {
    if (!req?.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async verify(email: string, password: string): Promise<UserResponse> {
    const user = this.users.find((user: User) => user.email === email);

    if (!user) throw new UnauthorizedException('credentials1');

    const hashedPassword = await hash(password, 10);
    const isPasswordMatched = await compare(password, hashedPassword);

    if (!isPasswordMatched) throw new UnauthorizedException('credentials2');

    const userResponse = { ...user, password: undefined };

    return userResponse;
  }

  async login(email: string, password: string) {
    const user = await this.verify(email, password);

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
