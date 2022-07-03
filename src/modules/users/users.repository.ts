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
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        address: data.address,
        cep: data.cep,
        doc_identity: data.doc_identity,
        password: data.password,
      },
    });
  }

  findByCpf(cpf: string): Promise<IUser | null> {
    return this.prisma.user.findFirst({ where: { cpf } });
  }

  findAll(): Promise<IUser[]> {
    return this.prisma.user.findMany();
  }
}
