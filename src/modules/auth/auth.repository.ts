import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IUser } from '../users/users.structure';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}
  findByEmail(email: string): Promise<IUser> {
    return this.prisma.user.findFirst({ where: { email } });
  }
}
