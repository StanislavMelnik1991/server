import {
  Query,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ROLE } from 'src/constants/user.constants';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtPayload } from 'src/types/jwt.type';
import {
  CreateResponseBodyDto,
  GetAllUsersQueryDto,
} from './dto/user_requests.controller.dto';
import { UserResponsesService } from './user_responses.service';

@ApiTags('Admin service')
@Controller('api/admin')
export class UserResponsesController {
  constructor(private userResponsesService: UserResponsesService) {}

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: 200 })
  @Roles(ROLE.ADMIN)
  @UseGuards(RolesGuard)
  @Get('')
  async getAllUser(@Query() dto: GetAllUsersQueryDto) {
    return await this.userResponsesService.getAllUsers(dto);
  }

  @ApiOperation({ summary: 'get all active requests for user' })
  @ApiResponse({ status: 200 })
  @Roles(ROLE.ADMIN)
  @UseGuards(RolesGuard)
  @Get('/:id')
  async getAllReqForUser(@Param('id') id: string) {
    return await this.userResponsesService.getAllReqForUser(Number(id));
  }

  @ApiOperation({ summary: 'get all active requests for user' })
  @ApiResponse({ status: 200 })
  @Roles(ROLE.ADMIN)
  @UseGuards(RolesGuard)
  @Get('req/:id')
  async getRequest(@Param('id') id: string) {
    return await this.userResponsesService.getRequest(Number(id));
  }

  @ApiOperation({ summary: 'create request' })
  @ApiResponse({ status: 200 })
  @Roles(ROLE.ADMIN)
  @UseGuards(RolesGuard)
  @Post('/:id')
  async createRequest(
    @Param('id') id: string,
    @Body() dto: CreateResponseBodyDto,
    @Req() { user }: { user: JwtPayload },
  ) {
    await this.userResponsesService.createResponse({
      ...dto,
      userId: user.id,
      reqId: Number(id),
    });
    return;
  }
}
