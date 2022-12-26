import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/constants/error.constants';
import { ReqRepository } from './users_request.repository';

@Injectable()
export class UserRequestsService {
  constructor(private reqRepository: ReqRepository) {}

  async createUserRequest({ message, title, userId }) {
    await this.reqRepository.create({ message, title, userId });
  }

  getAllRequestsForUser({ offset, limit, userId }) {
    return this.reqRepository.getAllForUser({
      skip: offset,
      take: limit,
      userId,
    });
  }

  async getRequestById({ id, userId }: { id: number; userId }) {
    const req = await this.reqRepository.findById(id);
    if (!req) {
      throw new HttpException(ERROR_MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (req.userId !== userId) {
      throw new HttpException(ERROR_MESSAGE.FORBIDDEN, HttpStatus.FORBIDDEN);
    }
    return req;
  }
}
