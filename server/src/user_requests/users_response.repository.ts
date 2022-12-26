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

  findByReqId(reqId: number) {
    return this.reqRepository.findOne({ where: { reqId } });
  }
}
