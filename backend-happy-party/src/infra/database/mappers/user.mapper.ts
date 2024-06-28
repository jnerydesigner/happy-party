import { User } from '@prisma/client';

export class UserMapper {
  static toResponse(user: User): Omit<UserDTO, 'password'> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    };
  }
}

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
