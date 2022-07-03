/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersRepository } from './../../modules/users/users.repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma.service';
import { UsersService } from '../../modules/users/users.service';
import createUser from '../../__tests__/__mocks__/createUserToTest';

jest.mock('../../database/prisma.service');

describe('UsersService', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      providers: [UsersService, UsersRepository, PrismaService],
    }).compile();

    usersService = moduleFixture.get<UsersService>(UsersService);
    usersRepository = moduleFixture.get<UsersRepository>(UsersRepository);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('register', () => {
    it('should return a user', async () => {
      const mockUser = jest.spyOn(usersRepository, 'findByCpf');

      const user = await createUser();

      mockUser.mockResolvedValue(null);
      const mockRepository = jest
        .spyOn(usersRepository, 'register')
        .mockResolvedValue(user);

      const result = await usersService.register(user);
      expect(result).toEqual(user);

      expect(mockRepository).toHaveBeenCalledTimes(1);
    });

    it('should return error if user already exists', async () => {
      const user = await createUser();
      jest.spyOn(usersRepository, 'findByCpf').mockResolvedValue(user);

      try {
        await usersService.register(user);
      } catch (error) {
        expect(error.message).toEqual('User already exists');
      }
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = jest.spyOn(usersRepository, 'findAll');
      const users = [
        await createUser(),
        await createUser(),
        await createUser(),
      ];
      mockUsers.mockResolvedValue(users);
      expect(await usersService.findAll()).toEqual(users);
    });
  });
});
