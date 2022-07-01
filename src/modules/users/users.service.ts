import { UsersRepository } from './users.repository';
import { IUser } from './users.structure';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async register(data: IUser): Promise<IUser> {
    data.password = await bcrypt.hash(data.password, 10);
    const verifiedUser = await this.userRepository.findByCpf(data.cpf);

    if (verifiedUser) {
      throw new ForbiddenException('User already exists');
    }

    const newUser = await this.userRepository.register(data);

    delete newUser.password;
    return newUser;
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
