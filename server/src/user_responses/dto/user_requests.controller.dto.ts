import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class GetAllUsersQueryDto {
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

export class CreateResponseBodyDto {
  @ApiProperty({ example: 'Жалоба', description: 'response title' })
  @IsNotEmpty({ message: 'is required' })
  @IsString({ message: 'mast be string' })
  @Length(1, 256)
  readonly title: string;

  @ApiProperty({ example: 'всё починим', description: 'response text' })
  @IsNotEmpty({ message: 'is required' })
  @IsString({ message: 'mast be string' })
  @Length(5, 256)
  readonly message: string;
}
