import { Module } from '@nestjs/common';
import { UserResponsesService } from './user_responses.service';
import { UserResponsesController } from './user_responses.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserReq } from 'src/entities/user_request.entity';
import { UserRes } from 'src/entities/user_response.entity';
import { ReqRepository } from './users_request.repository';
import { ResRepository } from './users_response.repository';
import { UserRepository } from './users.repository';

@Module({
  providers: [
    UserResponsesService,
    ReqRepository,
    ResRepository,
    UserRepository,
  ],
  controllers: [UserResponsesController],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forFeature([User, UserReq, UserRes]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class UserResponsesModule {}
