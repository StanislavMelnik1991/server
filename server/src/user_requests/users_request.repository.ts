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
  async create({
    message,
    title,
    userId,
  }: {
    userId: number;
    title: string;
    message: string;
  }): Promise<UserReq> {
    const req = this.reqRepository.create({ userId, title, message });
    await this.reqRepository.save(req);
    return req;
  }

  getAllForUser({
    skip = 0,
    take = 10,
    userId,
  }: {
    userId: number;
    skip: number;
    take: number;
  }) {
    const requests = this.reqRepository.findAndCount({
      where: { userId },
      skip,
      take,
      select: { title: true, id: true, isDone: true },
    });
    return requests;
  }

  findById(id: number) {
    return this.reqRepository.findOne({ where: { id } });
  }
}
