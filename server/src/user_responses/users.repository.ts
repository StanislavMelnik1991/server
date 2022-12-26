import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

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
      relations: { requests: true },
    });
  }
}
