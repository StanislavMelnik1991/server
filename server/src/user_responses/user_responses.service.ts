import { Injectable } from '@nestjs/common';
import { GetAllUsersQueryDto } from './dto/user_requests.controller.dto';
import { UserRepository } from './users.repository';
import { ReqRepository } from './users_request.repository';
import { ResRepository } from './users_response.repository';

@Injectable()
export class UserResponsesService {
  constructor(
    private reqRepository: ReqRepository,
    private resRepository: ResRepository,
    private userRepository: UserRepository,
  ) {}

  getAllUsers({ limit, offset }: GetAllUsersQueryDto) {
    return this.userRepository.findAllUsers({ skip: offset, take: limit });
  }

  getAllReqForUser(userId: number) {
    return this.reqRepository.getAllActiveForUser(userId);
  }
  getRequest(id: number) {
    return this.reqRepository.findById(id);
  }
  async createResponse({
    message,
    reqId,
    userId,
  }: {
    message: string;
    reqId: number;
    userId: number;
  }) {
    await this.resRepository.create({
      message,
      reqId,
      userId,
    });
  }
}
