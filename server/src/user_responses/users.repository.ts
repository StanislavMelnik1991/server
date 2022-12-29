import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { ROLE } from 'src/constants/user.constants';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAllUsers({ skip, take }: { skip: number; take: number }) {
    return this.usersRepository.find({
      skip,
      take,
      where: { role: ROLE.USER },
    });
  }
}
