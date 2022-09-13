import { IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  balance: string;
  @IsString()
  accountType: string;
  @IsString()
  userId: string;
}
