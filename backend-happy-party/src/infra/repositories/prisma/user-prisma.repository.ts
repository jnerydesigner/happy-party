import { PrismaService } from '@infra/database/client/prisma.service';
import { UserRepository } from '../user.repository';
import { UserMapper } from '@infra/database/mappers/user.mapper';
import {
  UserResponse,
  UsersResponsePagination,
} from '@application/dto/pagination.dto';
import { User } from '@prisma/client';
import { UpdateUserDTO } from '@application/dto/update-user.dto';

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<UsersResponsePagination> {
    const users = await this.prisma.user.findMany({ skip: page, take: limit });

    const userEntities: UserResponse[] = users.map((user) =>
      UserMapper.toResponse(user),
    );

    const totalUsers = await this.prisma.user.count();

    return {
      users: userEntities,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
    };
  }

  async createUser(
    id: string,
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    return await this.prisma.user.create({
      data: {
        id,
        name,
        email,
        password,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async getUserById(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDTO): Promise<User> {
    const user = await this.getUserById(id);

    const updateUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...updateUserDto,
      },
    });
    return updateUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
