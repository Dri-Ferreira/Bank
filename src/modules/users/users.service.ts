import { UsersRepository } from './users.repository';
import { IUser } from './users.structure';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly mailService: MailerService,
  ) {}

  async register(data: IUser): Promise<IUser> {
    const verifiedUser = await this.userRepository.findByCpf(data.cpf);

    if (verifiedUser) {
      throw new ForbiddenException('User already exists');
    }

    const newUser = await this.userRepository.register(data);

    this.mailService.sendMail({
      to: data.email,
      from: 'Hilário tech <hilariotech@gmail.com>',
      subject: 'User successfully registered ✔',
      text: `Hi ${data.name}, you are receiving your access to the hilariotech system!
      to access the system use your registered email and password.`,
    });

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
