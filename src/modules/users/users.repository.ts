import { UpdateUserDto } from './dto/update-user.dto';
import { registerUser } from './models/params/params';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { responseUser } from './models/response/response-user-repository';
import { User } from '@prisma/client';
import { IUserRepository } from './users.structure';

@Injectable()
export class UsersRepository implements IUserRepository<User> {
  constructor(private readonly prisma: PrismaService) {}

  register(params: registerUser): Promise<responseUser> {
    return this.prisma.user.create({
      data: {
        ...params,
      },
    });
  }

  exists(where: Partial<User> | any): Promise<boolean | User | any> {
    return this.prisma.user.findFirst({
      where,
    });
  }

  findByCpf(cpf: string): Promise<responseUser | null> {
    return this.prisma.user.findFirst({ where: { cpf } });
  }

  findAll(): Promise<responseUser[]> {
    return this.prisma.user.findMany();
  }

  findById(id: string): Promise<responseUser | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<responseUser> {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });
  }
}
