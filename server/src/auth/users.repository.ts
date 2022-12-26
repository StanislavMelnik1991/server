import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ROLE } from 'src/constants/user.constants';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<User> {
    let user = this.usersRepository.create({
      email,
      name,
      password,
      role: ROLE.USER,
    });
    user = await this.usersRepository.save(user);
    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
