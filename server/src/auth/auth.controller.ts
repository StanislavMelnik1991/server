import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  CreateNewUserBodyDto,
  LoginUserBodyDto,
} from './dto/auth.controller.dto';

@ApiTags('Authorization')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 200, description: 'token' })
  @Post('/signup')
  async registration(@Body() dto: CreateNewUserBodyDto) {
    return { token: await this.authService.createNewUser(dto) };
  }

  @ApiOperation({ summary: 'login user' })
  @ApiResponse({ status: 200, description: 'token' })
  @Post('/signin')
  async login(@Body() dto: LoginUserBodyDto) {
    return { token: await this.authService.login(dto) };
  }
}
