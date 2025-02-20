import { IsNumber, IsString, IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity({ name: 'store_key_word' })
export class StoreKeyWordEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  @IsString()
  name: string;

  @ManyToOne(() => StoreEntity, (store) => store.keywordList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;
}
