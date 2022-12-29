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
    });
    return requests;
  }
  async countActiveForUser(userId: number) {
    const [, total] = await this.reqRepository.findAndCount({
      where: { userId, isDone: false },
      select: { title: true, id: true },
    });
    return total;
  }
  findById(id: number) {
    return this.reqRepository.findOne({ where: { id } });
  }

  async closeRequest(id: number) {
    const res = await this.reqRepository.findOne({ where: { id } });
    res.isDone = true;
    await this.reqRepository.save(res);
  }
}
