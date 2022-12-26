import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtPayload } from 'src/types/jwt.type';
import {
  CreateNewRequestBodyDto,
  GetAllRequestQueryDto,
} from './dto/user_requests.controller.dto';
import { UserRequestsService } from './user_requests.service';

@ApiTags('Requests')
@Controller('api/res')
export class UserRequestsController {
  constructor(private userReqService: UserRequestsService) {}

  @ApiOperation({ summary: 'create user request' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  @Post('')
  async createRequest(
    @Body() dto: CreateNewRequestBodyDto,
    @Req() { user }: { user: JwtPayload },
  ) {
    await this.userReqService.createUserRequest({ ...dto, userId: user.id });
    return;
  }

  @ApiOperation({ summary: 'get all requests titles for user' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  @Get('')
  async getAllRequestsForUser(
    @Query() dto: GetAllRequestQueryDto,
    @Req() { user }: { user: JwtPayload },
  ) {
    const messages = this.userReqService.getAllRequestsForUser({
      ...dto,
      userId: user.id,
    });
    return messages;
  }

  @ApiOperation({ summary: 'create user request' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getRequests(
    @Param('id') id: string,
    @Req() { user }: { user: JwtPayload },
  ) {
    const messages = this.userReqService.getRequestById({
      id: Number(id),
      userId: user.id,
    });
    return messages;
  }
}
