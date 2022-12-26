import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserReq } from 'src/entities/user_request.entity';

@Injectable()
export class ReqRepository {
  constructor(
    @InjectRepository(UserReq)
    private reqRepository: Repository<UserReq>,
  ) {}

  getAllActiveForUser(userId: number) {
    const requests = this.reqRepository.find({
      where: { userId, isDone: false },
      select: { title: true, id: true },
    });
    return requests;
  }

  findById(id: number) {
    return this.reqRepository.findOne({ where: { id } });
  }
}
