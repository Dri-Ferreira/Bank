import { AuthRepository } from './auth.repository';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.authRepository.findByEmail(loginAuthDto.email);
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const compare = await bcrypt.compare(loginAuthDto.password, user.password);

    if (!compare) {
      throw new ForbiddenException('Invalid password or email');
    }

    return 'Logged in successfully';
  }
}
