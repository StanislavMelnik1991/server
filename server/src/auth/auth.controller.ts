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
  registration(@Body() dto: CreateNewUserBodyDto) {
    return this.authService.createNewUser(dto);
  }

  @ApiOperation({ summary: 'login user' })
  @ApiResponse({ status: 200, description: 'token' })
  @Post('/signin')
  login(@Body() dto: LoginUserBodyDto) {
    return this.authService.login(dto);
  }
}
