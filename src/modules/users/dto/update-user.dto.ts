import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(3)
  @Matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, {
    message: 'Name is only allowed Letters',
  })
  @IsOptional()
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @MinLength(8)
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/,
    {
      message: 'Password does not meet the necessary requirements!',
    },
  )
  @IsOptional()
  readonly password: string;

  @Matches(/^[0-9]*$/, {
    message: 'CPF is only allowed Numbers',
  })
  @IsOptional()
  @MinLength(11)
  readonly cpf: string;

  @IsOptional()
  @Matches(/^[0-9]*$/, {
    message: 'document is only allowed Numbers',
  })
  readonly doc_identity: string;

  @IsOptional()
  @MinLength(5)
  readonly address: string;

  @IsOptional()
  @MinLength(8)
  readonly cep: string;
}
