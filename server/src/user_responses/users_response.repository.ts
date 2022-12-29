import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRes } from 'src/entities/user_response.entity';

@Injectable()
export class ResRepository {
  constructor(
    @InjectRepository(UserRes)
    private reqRepository: Repository<UserRes>,
  ) {}
  async create({
    message,
    userId,
    reqId,
  }: {
    userId: number;
    reqId: number;
    message: string;
  }): Promise<UserRes> {
    const req = this.reqRepository.create({ userId, message, reqId });
    await this.reqRepository.save(req);
    return req;
  }

  findById(id: number) {
    return this.reqRepository.findOne({ where: { id } });
  }
}
