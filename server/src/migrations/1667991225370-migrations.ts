import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcrypt';
import 'dotenv/config';
import { ROLE } from '../constants/user.constants';
import { HASH_ROUNDS } from '../constants/auth.constants';

export class migrations1667991225370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('Admin123!', HASH_ROUNDS);
    await queryRunner.query(
      `INSERT INTO "users" ("name", "email", "password", "role")
      VALUES ('admin', 'admin@admin.com', '${password}', '${ROLE.ADMIN}');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "users" WHERE "name" = \'admin\'');
  }
}
