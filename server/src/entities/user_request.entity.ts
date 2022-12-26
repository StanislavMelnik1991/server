import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('requests')
export class UserReq extends BaseEntity {
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

  @Column({ default: false })
  isDone: boolean;
}
