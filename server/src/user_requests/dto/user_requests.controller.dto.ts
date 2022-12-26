import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateNewRequestBodyDto {
  @ApiProperty({ example: 'Жалоба', description: 'request title' })
  @IsNotEmpty({ message: 'is required' })
  @IsString({ message: 'mast be string' })
  @Length(1, 256)
  readonly title: string;

  @ApiProperty({ example: 'что-то не работает', description: 'request text' })
  @IsNotEmpty({ message: 'is required' })
  @IsString({ message: 'mast be string' })
  @Length(5, 256)
  readonly message: string;
}

export class GetAllRequestQueryDto {
  @ApiProperty({ example: 0, description: 'offset', required: false })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'must be number' },
  )
  @IsInt({ message: 'must be integer' })
  readonly offset: number = 0;

  @ApiProperty({ example: 10, description: 'limit', required: false })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'must be number' },
  )
  @IsInt({ message: 'must be integer' })
  readonly limit: number = 10;
}

export class AuthResDto {
  token: string;
}
