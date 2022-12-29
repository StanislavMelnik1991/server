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

  async getAllUsers({ limit = 10, offset = 0 }: GetAllUsersQueryDto) {
    const users = await this.userRepository.findAllUsers({
      skip: offset,
      take: limit,
    });
    users.map(async (user) => {
      const total = await this.reqRepository.countActiveForUser(user.id);
      return { ...user, total };
    });
    return Promise.all(users);
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
