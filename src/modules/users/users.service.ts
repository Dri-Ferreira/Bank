import { registerUser } from './models/params/params';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as sgMail from '@sendgrid/mail';
import { responseUser } from './models/response/response-user-repository';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { IUserRepository } from './users.structure';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly userRepository: IUserRepository<User>,
  ) {}

  async register(params: registerUser): Promise<responseUser> {
    const verifyExist = await this.userRepository.exists({
      OR: [{ cpf: params.cpf }, { email: params.email }],
    });
    params.password = await bcrypt.hash(params.password, 10);

    if (verifyExist) {
      throw new ForbiddenException('User already exists');
    }

    const newUser = await this.userRepository.register(params);
    delete newUser.password;
    return newUser;
  }

  async findAll(): Promise<responseUser[]> {
    const searchAll = await this.userRepository.findAll();
    searchAll.map((user) => {
      delete user.password;
    });
    return searchAll;
  }

  async findById(id: string): Promise<responseUser | null> {
    const user = await this.userRepository.exists({
      OR: [{ id }],
    });
    if (!user) {
      throw new ForbiddenException(' Usuário não encontrado id Inválido!');
    }
    delete user.password;
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.exists({
      OR: [{ id }],
    });
    if (!user) throw new ForbiddenException('User does not exist');

    const update = await this.userRepository.updateUser(id, updateUserDto);
    delete update.password;
    return update;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
