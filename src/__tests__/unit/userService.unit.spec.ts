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
      const user = await createUser();
      const mockRepository = jest
        .spyOn(usersRepository, 'register')
        .mockResolvedValue(user);

      console.log(user);
      const result = await usersService.register(user);
      expect(result).toEqual(user);
      console.log(result);
      expect(mockRepository).toHaveBeenCalledTimes(1);
    });
  });
});
