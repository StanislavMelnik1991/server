import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateNewUserBodyDto {
  @ApiProperty({ example: 'John', description: 'user name' })
  @IsNotEmpty({ message: 'is required' })
  @IsString({ message: 'mast be string' })
  @Length(5, 256)
  readonly name: string;

  @ApiProperty({ example: 'JohnSmith@mail.com', description: 'user email' })
  @IsNotEmpty({ message: 'is required' })
  @IsString({ message: 'mast be string' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'Qwerty1234$%^&', description: 'user password' })
  @IsNotEmpty({ message: 'is required' })
  @IsString({ message: 'mast be string' })
  @Length(8, 256)
  readonly password: string;
}
export class LoginUserBodyDto {
  @ApiProperty({ example: 'JohnSmith@mail.com', description: 'user email' })
  @IsNotEmpty({ message: 'email is required' })
  @IsString({ message: 'email mast be string' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'Qwerty1234$%^&', description: 'user password' })
  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password mast be string' })
  @Length(8, 256)
  readonly password: string;
}

export class AuthResDto {
  token: string;
}
