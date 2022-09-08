import { registerUser } from './models/params/params';
import { UsersRepository } from './users.repository';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import * as sgMail from '@sendgrid/mail';
import { responseUser } from './models/response/response-user-repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async register(params: registerUser): Promise<responseUser> {
    const verifiedUser = await this.userRepository.findByCpf(params.cpf);
    params.password = await bcrypt.hash(params.password, 10);

    if (verifiedUser) {
      throw new ForbiddenException('User already exists');
    }

    const newUser = await this.userRepository.register(params);

    // this.mailService.sendMail({
    //   to: params.email,
    //   from: 'Hilário tech <hilariotech@gmail.com>',
    //   subject: 'User successfully registered ✔',
    //   text: `Hi ${params.name}, you are receiving your access to the hilariotech system!
    //   to access the system use your registered email and password.`,
    // });

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
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ForbiddenException(' Usuário não encontrado id Inválido!');
    }
    delete user.password;
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
