import { UsersResponsePagination } from '@application/dto/pagination.dto';
import { UpdateUserDTO } from '@application/dto/update-user.dto';
import { User } from '@prisma/client';

export interface UserRepository {
  createUser(
    id: string,
    name: string,
    email: string,
    password: string,
  ): Promise<User>;

  getUserByEmail(email: string): Promise<User>;
  findAll(skip: number, limit: number): Promise<UsersResponsePagination>;
  getUserById(id: string): Promise<User>;
  updateUser(id: string, updateUserDto: UpdateUserDTO): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
