import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StoreKeyWordEntity } from './store-key-word.entity';
import { UserStoreEntity } from './user-store-list.entity';
import { StoreImageListEntity } from './store-image-list.entity';

@Entity({ name: 'store' })
export class StoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  @IsString()
  name: string;

  @Column({
    name: 'description',
    type: 'text',
  })
  @IsString()
  description: string;

  @Column({
    name: 'min_price',
    type: 'int',
  })
  @IsNumber()
  minPrice: number;

  @Column({
    name: 'max_price',
    type: 'int',
  })
  @IsNumber()
  maxPrice: number;

  @Column({
    name: 'scope',
    type: 'float',
  })
  @IsNumber()
  scope: number;

  @Column({
    name: 'review',
    type: 'text',
  })
  @IsString()
  review: string;

  @OneToMany(() => StoreKeyWordEntity, (storeKeyWord) => storeKeyWord.store, {
    cascade: true,
  })
  keywordList: StoreKeyWordEntity[];

  @OneToMany(() => UserStoreEntity, (userStore) => userStore.store)
  userStoreList: UserStoreEntity[];

  @OneToMany(
    () => StoreImageListEntity,
    (storeImageList) => storeImageList.store,
  )
  storeImageList: StoreImageListEntity[];
}
