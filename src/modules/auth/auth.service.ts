import { AuthLoginResponse } from './response/response-auth-service';
import { AuthLoginParams } from './params/params-auth-service';
import { AuthRepository } from './auth.repository';
import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  async login(params: AuthLoginParams): Promise<AuthLoginResponse> {
    const user = await this.authRepository.findByEmail(params.email);
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const compare = await bcrypt.compare(params.password, user.password);
    if (!compare) {
      throw new ForbiddenException('Invalid password or email');
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        id: user.id,
      },
      secret,
      {
        expiresIn: '30m',
      },
    );
    return { token };
  }
}
