import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsUUID } from 'class-validator';
import { UserStoreEntity } from './user-store-list.entity';
import { UserKeyWordEntity } from './user-key-word-list.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  role: string;

  @OneToMany(() => UserStoreEntity, (userStore) => userStore.user)
  userStoreList: UserStoreEntity[];

  @OneToMany(() => UserKeyWordEntity, (keyword) => keyword.user, {
    cascade: true,
  })
  keywordList: UserKeyWordEntity[];
}
