export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type UserResponse = Omit<User, 'password'>;
