import { PrismaService } from './../../database/prisma.service';
import { AccountsRepository } from './account.repository';
import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository, PrismaService],
})
export class AccountsModule {}
