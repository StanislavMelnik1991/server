import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './data-source';
import { AuthModule } from './auth/auth.module';
import { UserRequestsModule } from './user_requests/user_requests.module';
import { UserResponsesModule } from './user_responses/user_responses.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    AppDataSource,
    AuthModule,
    UserRequestsModule,
    UserResponsesModule,
  ],
})
export class AppModule {}
