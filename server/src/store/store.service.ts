import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateStoreDto } from './dtos/create-store.dto';
import { EntityManager, In } from 'typeorm';
import { StoreEntity, StoreKeyWordEntity } from 'src/database/entities';

export class StoreService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  createStore(dto: CreateStoreDto) {
    const keywordList = dto.keywordList.map((keyword) =>
      this.entityManager.create(StoreKeyWordEntity, {
        name: keyword,
      }),
    );

    const store = this.entityManager.create(StoreEntity, {
      ...dto,
      keywordList,
    });

    this.entityManager.save(this.entityManager.create(StoreEntity, store));
  }

  async getStoreList(keywordList: string[]) {
    return await this.entityManager
      .createQueryBuilder(StoreEntity, 'store')
      .leftJoin('store.keywordList', 'storeKeyWord')
      .where('storeKeyWord.name IN (:...keywordList)', { keywordList })
      .groupBy('store.id')
      .having('COUNT(storeKeyWord.id) >= 2')
      .select([
        'store.id',
        'store.name',
        'store.description',
        'store.imageUrl',
        'store.minPrice',
        'store.maxPrice',
        'store.scope',
        'store.review',
        'ARRAY_AGG(storeKeyWord.name) AS keywords',
      ])
      .getRawMany();
  }
}
