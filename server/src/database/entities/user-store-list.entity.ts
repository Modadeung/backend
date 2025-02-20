import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { StoreEntity } from './store.entity';

@Entity({ name: 'user_store_list' })
export class UserStoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userStoreList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => StoreEntity, (store) => store.userStoreList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @Column({
    name: 'start_schedule',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  startSchedule?: string;

  @Column({
    name: 'end_schedule',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  endSchedule?: string;
}
