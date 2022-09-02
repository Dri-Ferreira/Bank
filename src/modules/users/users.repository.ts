import { registerUser } from './models/params/params';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcryptjs';
import { responseUser } from './models/response/response-user-repository';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(params: registerUser): Promise<responseUser> {
    params.password = await bcrypt.hash(params.password, 10);
    return this.prisma.user.create({
      data: {
        ...params,
      },
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
}
