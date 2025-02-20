import { IsNumber, IsString, IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity({ name: 'store_image_list' })
export class StoreImageListEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({
    name: 'store_id',
    type: 'uuid',
  })
  @IsUUID()
  storeId: string;

  @Column({
    name: 'image_url',
    type: 'text',
  })
  @IsString()
  imageUrl: string;

  @ManyToOne(() => StoreEntity, (store) => store.storeImageList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;
}
