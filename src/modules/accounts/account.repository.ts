import { responseAccount } from './models/response/response-account';
import { accountRegister } from './models/params/params';
import { PrismaService } from './../../database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  registerAccount(params: accountRegister): Promise<responseAccount> {
    return this.prisma.account.create({ data: { ...params } });
  }
}
