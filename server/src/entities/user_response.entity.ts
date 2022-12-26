import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { UserReq } from './user_request.entity';

@Entity('responses')
export class UserRes extends BaseEntity {
  @Column()
  title: string;

  @Column()
  message: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => UserReq)
  @JoinColumn({
    name: 'reqId',
  })
  req: UserReq;

  @Column()
  reqId: number;
}
