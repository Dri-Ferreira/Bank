import { responseAccount } from './models/response/response-account';
import { accountRegister } from './models/params/params';

export interface IAccountsService {
  registerAccount(params: accountRegister): Promise<responseAccount | null>;
}

export interface IAccountsRepository {
  registerAccount(params: accountRegister): Promise<responseAccount>;
}
