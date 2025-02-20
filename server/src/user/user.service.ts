import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from './dtos';
import { UserEntity } from 'src/database/entities';
import { UserKeyWordEntity } from 'src/database/entities/user-key-word-list.entity';
import { CreateUserKeyWordDto } from './dtos/create-user-key-word.dto';
import { UpdateUserKeyWordDto } from './dtos/update-user-key-word.dto';

export class UserService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.entityManager.save(
      this.entityManager.create(UserEntity, dto),
    );

    return {
      id: user.id,
      role: user.role,
    };
  }

  async createUserKeyWordList(dto: CreateUserKeyWordDto) {
    const keywordList = dto.keyWordList.map((keyword) =>
      this.entityManager.create(UserKeyWordEntity, {
        user: { id: dto.userId },
        name: keyword,
      }),
    );

    await this.entityManager.save(keywordList);
  }

  async getUserKeyWordList(userId: string) {
    const findResult = await this.entityManager.find(UserKeyWordEntity, {
      where: {
        userId,
      },
      select: {
        name: true,
      },
    });

    return findResult.map((keyword) => keyword.name);
  }

  async updateUserKeyWordList(dto: UpdateUserKeyWordDto) {
    await this.entityManager.delete(UserKeyWordEntity, {
      userId: dto.userId,
    });

    await this.createUserKeyWordList(dto);
  }
}
