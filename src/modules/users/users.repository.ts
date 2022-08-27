import { IUser } from './users.structure';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: IUser): Promise<IUser> {
    data.password = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
      },
    });
  }

  findByCpf(cpf: string): Promise<IUser | null> {
    return this.prisma.user.findFirst({ where: { cpf } });
  }

  findAll(): Promise<IUser[]> {
    return this.prisma.user.findMany();
  }

  findById(id: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
