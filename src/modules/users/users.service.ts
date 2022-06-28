import { UsersRepository } from './users.repository';
import { IUser, IUserService } from './users.structure';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async register(data: IUser): Promise<IUser> {
    const verifiedUser = await this.userRepository.findByCpf(data.cpf);

    if (verifiedUser) {
      throw new ForbiddenException('User already exists');
    }
    const newUser = await this.userRepository.register(data);
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
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
