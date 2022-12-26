import { TypeOrmModule } from '@nestjs/typeorm';
import * as Migrations from './migrations';
import { User } from './entities/user.entity';
import 'dotenv/config';
import { UserReq } from './entities/user_request.entity';
import { UserRes } from './entities/user_response.entity';

export const AppDataSource = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
  synchronize: true,
  entities: [User, UserReq, UserRes],
  migrations: Object.values(Migrations),
});
