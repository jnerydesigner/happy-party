import { CreateUserDTO } from '@application/dto/create-user.dto';
import { UserResponse } from '@application/dto/pagination.dto';
import { UpdateUserDTO } from '@application/dto/update-user.dto';
import { UserEntity } from '@domain/entities/user.entity';
import { UserMapper } from '@infra/database/mappers/user.mapper';
import { UserRepository } from '@infra/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: UserRepository,
  ) {}
  async createUser(createUser: CreateUserDTO): Promise<void | UserResponse> {
    const userExists = await this.userRepository.getUserByEmail(
      createUser.email,
    );

    if (userExists) {
      return UserMapper.toResponse(userExists);
    }

    const newUser = await UserEntity.createUser(
      createUser.name,
      createUser.email,
      createUser.password,
    );

    return UserMapper.toResponse(
      await this.userRepository.createUser(
        newUser.id,
        newUser.name,
        newUser.email,
        newUser.password,
      ),
    );
  }
  async getUserById(id: string) {
    const userResponse = await this.userRepository.getUserById(id);
    const userMapper = UserMapper.toResponse(userResponse);

    return userMapper;
  }

  async getUserByEmail(email: string) {
    const userResponse = await this.userRepository.getUserByEmail(email);

    return new UserEntity(
      userResponse.name,
      userResponse.email,
      userResponse.password,
      userResponse.id,
    );
  }

  async getUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    return this.userRepository.findAll(skip, limit);
  }

  async updateUser(id: string, user: UpdateUserDTO) {
    const userResponse = await this.userRepository.updateUser(id, user);

    return UserMapper.toResponse(userResponse);
  }

  async deleteUser(id: string) {
    await this.userRepository.deleteUser(id);
  }
}
