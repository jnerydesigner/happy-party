/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateUserDTO } from '@application/dto/create-user.dto';
import { UpdateUserDTO } from '@application/dto/update-user.dto';
import { UserService } from '@application/services/user.service';
import { PrismaService } from '@infra/database/client/prisma.service';
import { UserPrismaRepository } from '@infra/repositories/prisma/user-prisma.repository';
import { UserRepository } from '@infra/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let userRepository: UserRepository;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PrismaService,
        {
          provide: 'USER_REPOSITORY',
          useClass: UserPrismaRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    userRepository = module.get<UserRepository>('USER_REPOSITORY');

    jest
      .spyOn(userRepository, 'createUser')
      .mockImplementation(
        async (id: string, name: string, email: string, password: string) => {
          return {
            id,
            name,
            email,
            password,
            created_at: new Date(),
            updated_at: new Date(),
          };
        },
      );

    jest
      .spyOn(userRepository, 'getUserByEmail')
      .mockImplementation(async (email: string) => ({
        id: '1',
        name: 'John Doe',
        email: 'john.doe@email.com',
        password: '123456',
        created_at: new Date(),
        updated_at: new Date(),
      }));

    jest
      .spyOn(userRepository, 'deleteUser')
      .mockImplementation(async (id: string) => {
        return;
      });

    jest
      .spyOn(userRepository, 'getUserById')
      .mockImplementation(async (id: string) => {
        return {
          id,
          name: 'John Doe',
          email: 'john.doe@email.com',
          password: '123456',
          created_at: new Date(),
          updated_at: new Date(),
        };
      });

    jest
      .spyOn(userRepository, 'updateUser')
      .mockImplementation(async (id: string, updateUserDto: UpdateUserDTO) => {
        return {
          id,
          name: updateUserDto.name,
          email: updateUserDto.email,
          password: updateUserDto.password,
          created_at: new Date(),
          updated_at: new Date(),
        };
      });

    jest
      .spyOn(userRepository, 'findAll')
      .mockImplementation(async (skip: number, limit: number) => {
        const users = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@email.com',
            password: '123456',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '2',
            name: 'Jane Doe',
            email: 'jane.doe@email.com',
            password: '123456',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        const totalUsers = users.length;
        const paginatedUsers = users.slice(skip, skip + limit);

        return {
          users: paginatedUsers,
          pagination: {
            total: totalUsers,
            page: Math.floor(skip / limit) + 1,
            limit,
            totalPages: Math.ceil(totalUsers / limit),
          },
        };
      });
  });

  it('should create a new user', async () => {
    const input: CreateUserDTO = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456',
    };

    const response = await userService.createUser(input);

    const user = await userService.getUserByEmail(input.email);

    expect(response).toHaveProperty('id');
    expect(user.name).toBe(input.name);
    expect(user.email).toBe(input.email);
  });

  it('should paginate users', async () => {
    const page = 1;
    const limit = 2;
    const result = await userService.getUsers(page, limit);

    expect(result.users).toHaveLength(2);
    expect(result.pagination.total).toBeGreaterThan(0);
    expect(result.pagination.page).toBe(page);
    expect(result.pagination.limit).toBe(limit);
    expect(result.pagination.totalPages).toBeGreaterThan(0);
  });

  it('should delete a user', async () => {
    const id = '1';
    await userService.deleteUser(id);
    expect(userRepository.deleteUser).toHaveBeenCalledWith(id);
  });

  it('should update a user', async () => {
    const id = '1';
    const inputUpdate: UpdateUserDTO = {
      name: 'Jane Doe',
      email: 'jane.doe@email.com',
      password: '123456',
    };

    const inputCreate: CreateUserDTO = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456',
    };

    await userService.createUser(inputCreate);

    const response = await userService.updateUser(id, inputUpdate);

    expect(response.name).toBe(inputUpdate.name);
  });
});
