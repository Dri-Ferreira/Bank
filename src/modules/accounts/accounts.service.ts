import { accountRegister } from './models/params/params';
import { responseAccount } from './models/response/response-account';
import { AccountsRepository } from './account.repository';
import { Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountsRepository) {}

  async registerAccount(params: accountRegister): Promise<responseAccount> {
    return this.accountRepository.registerAccount(params);
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
