import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareSync, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  CreateNewUserBodyDto,
  LoginUserBodyDto,
} from './dto/auth.controller.dto';
import { JwtPayload } from 'src/types/jwt.type';
import { HASH_ROUNDS } from 'src/constants/auth.constants';
import { ERROR_MESSAGE } from 'src/constants/error.constants';
import { UsersRepository } from './users.repository';
import { ROLE } from 'src/constants/user.constants';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async createNewUser({
    email,
    name,
    password,
  }: CreateNewUserBodyDto): Promise<{ token: string; role: ROLE }> {
    const conflict = !!(await this.userRepository.findByEmail(email));
    if (conflict) {
      throw new HttpException(
        ERROR_MESSAGE.EMAIL_ALREADY_USED,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const hashPassword = await hash(password, HASH_ROUNDS);
    const user = await this.userRepository.create({
      email,
      name,
      password: hashPassword,
    });
    const token = this.generateToken({
      email: user.email,
      id: user.id,
      role: user.role,
    });
    return { token, role: user.role };
  }

  async login({
    email,
    password,
  }: LoginUserBodyDto): Promise<{ token: string; role: ROLE }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGE.INCORRECT_AUTH,
        HttpStatus.NOT_FOUND,
      );
    }
    const comparePassword = compareSync(password, user.password);
    if (!comparePassword) {
      throw new HttpException(
        ERROR_MESSAGE.INCORRECT_AUTH,
        HttpStatus.NOT_FOUND,
      );
    }
    const token = this.generateToken({
      email: user.email,
      id: user.id,
      role: user.role,
    });
    return { token, role: user.role };
  }

  private generateToken: (jwtPayload: JwtPayload) => string = (jwtPayload) => {
    return this.jwtService.sign(jwtPayload);
  };
}
