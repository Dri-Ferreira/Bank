import { IUser } from '../users/users.structure';
import { LoginAuthDto } from './dto/login-auth.dto';

export interface IAuthService {
  login(loginAuthDto: LoginAuthDto): Promise<object>;
}

export interface IAuthRepository {
  login(loginAuthDto: LoginAuthDto): Promise<object>;
  findByEmail(email: string): Promise<IUser>;
}
