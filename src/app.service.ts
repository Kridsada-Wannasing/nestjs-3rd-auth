import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './utils/user-interface';
import { hash, compare } from 'bcrypt';

type UserResponse = Omit<User, 'password'>;

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

  getHello(): string {
    return 'Hello World!';
  }

  async login(email: string, password: string): Promise<UserResponse> {
    const user = this.users.find((user: User) => user.email === email);

    if (!user) throw new UnauthorizedException('credentials');

    const hashedPassword = await hash(password, 10);
    const isPasswordMatched = await compare(password, hashedPassword);

    if (!isPasswordMatched) throw new UnauthorizedException('credentials');

    const userResponse = { ...user, password: undefined };

    return userResponse;
  }
}
