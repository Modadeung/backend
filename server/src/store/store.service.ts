import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateStoreDto } from './dtos/create-store.dto';
import { EntityManager, In } from 'typeorm';
import {
  StoreEntity,
  StoreKeyWordEntity,
  UserEntity,
} from 'src/database/entities';
import { StoreImageListEntity } from 'src/database/entities/store-image-list.entity';
import { CreateUserReservationDto } from './dtos/create-user-reservation.dto';
import { UserStoreEntity } from 'src/database/entities/user-store-list.entity';

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

    const storeImageList = dto.imageUrl.map((imageUrl) =>
      this.entityManager.create(StoreImageListEntity, {
        imageUrl: imageUrl,
      }),
    );

    const store = this.entityManager.create(StoreEntity, {
      ...dto,
      keywordList,
      storeImageList,
    });

    return this.entityManager.save(StoreEntity, store).then((savedStore) => {
      storeImageList.forEach((image) => {
        image.storeId = savedStore.id;
      });

      return this.entityManager.save(StoreImageListEntity, storeImageList);
    });
  }

  async getStoreList(keywordList: string[]) {
    const stores = await this.entityManager
      .createQueryBuilder(StoreEntity, 'store')
      .leftJoin('store.keywordList', 'storeKeyWord')
      .leftJoin('store.storeImageList', 'storeImage')
      .where('storeKeyWord.name IN (:...keywordList)', { keywordList })
      .groupBy('store.id')
      .having('COUNT(DISTINCT storeKeyWord.id) >= 2')
      .select([
        'store.id AS store_id',
        'store.name AS store_name',
        'store.description AS store_description',
        'store.minPrice AS store_min_price',
        'store.maxPrice AS store_max_price',
        'store.scope AS store_scope',
        'store.review AS store_review',
        "CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(storeImage.imageUrl)), ']') AS imageUrls",
        "CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(storeKeyWord.name)), ']') AS keywords",
      ])
      .getRawMany();

    return stores.map((store) => ({
      store_id: store.store_id,
      store_name: store.store_name,
      store_description: store.store_description,
      store_min_price: store.store_min_price,
      store_max_price: store.store_max_price,
      store_scope: store.store_scope,
      store_review: store.store_review,
      imageUrlList: JSON.parse(store.imageUrls), // 이제 JSON으로 변환 가능!
      keywordList: JSON.parse(store.keywords), // 이제 JSON으로 변환 가능!
    }));
  }

  async getStoreDetail(storeId: string) {
    const store = await this.entityManager.findOne(StoreEntity, {
      where: {
        id: storeId,
      },
      relations: {
        keywordList: true,
        storeImageList: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        minPrice: true,
        maxPrice: true,
        scope: true,
        review: true,
        keywordList: {
          name: true,
        },
        storeImageList: {
          imageUrl: true,
        },
      },
    });

    return {
      ...store,
      keywordList: store?.keywordList?.map((kw) => kw.name) || [],
      storeImageList: store?.storeImageList?.map((img) => img.imageUrl) || [],
    };
  }

  async reservationStore(dto: CreateUserReservationDto) {
    const user = await this.entityManager.findOne(UserEntity, {
      where: { id: dto.userId },
    });

    const store = await this.entityManager.findOne(StoreEntity, {
      where: { id: dto.storeId },
    });

    // 유저 또는 상점이 존재하지 않으면 예외를 던집니다.
    if (!user || !store) {
      throw new Error('유저 또는 상점이 존재하지 않습니다.');
    }

    // 새로운 예약을 위한 UserStoreEntity 생성
    const userStoreReservation = this.entityManager.create(UserStoreEntity, {
      user,
      store,
      startSchedule: dto.startDate,
      endSchedule: dto.endDate,
    });

    // UserStoreEntity 저장
    await this.entityManager.save(userStoreReservation);
  }
}
