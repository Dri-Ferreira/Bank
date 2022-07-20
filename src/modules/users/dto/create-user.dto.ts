import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
export class CreateUserDto {
  id?: string;

  @IsString()
  name: string;
  email: string;
  password: string;
  cpf: string;
  doc_identity: string;
  address: string;
  cep: string;
}
