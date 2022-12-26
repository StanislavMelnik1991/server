import { Module } from '@nestjs/common';
import { UserRequestsService } from './user_requests.service';
import { UserRequestsController } from './user_requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserReq } from 'src/entities/user_request.entity';
import { ReqRepository } from './users_request.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserRes } from 'src/entities/user_response.entity';
import { ResRepository } from './users_response.repository';

@Module({
  providers: [UserRequestsService, ReqRepository, ResRepository],
  controllers: [UserRequestsController],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forFeature([UserReq, UserRes]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class UserRequestsModule {}
