import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
export class CreateUserDto {
  id?: string;

  @MinLength(3)
  @Matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, {
    message: 'Name is only allowed Letters',
  })
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/,
    {
      message: 'Password does not meet the necessary requirements!',
    },
  )
  readonly password: string;

  @Matches(/^[0-9]*$/, {
    message: 'CPF is only allowed Numbers',
  })
  @MinLength(11)
  @IsString()
  readonly cpf: string;

  @Matches(/^[0-9]*$/, {
    message: 'document is only allowed Numbers',
  })
  @IsString()
  readonly doc_identity: string;

  @MinLength(5)
  @IsString()
  readonly address: string;

  @MinLength(8)
  @IsString()
  readonly cep: string;
}
