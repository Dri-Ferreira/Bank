import { AuthLoginResponse } from './response/response-auth-service';
import { AuthLoginParams } from './params/params-auth-service';
import { IUser } from '../users/users.structure';

export interface IAuthService {
  login(params: AuthLoginParams): Promise<AuthLoginResponse>;
}

export interface IAuthRepository {
  findByEmail(email: string): Promise<IUser>;
}
