import { IsArray, IsString, IsUUID } from 'class-validator';

export class CreateUserKeyWordDto {
  /**
   * 사용자 ID
   * @example 'uuid'
   */
  @IsUUID()
  userId: string;

  /**
   * 키워드 리스트
   * @example ['키워드1', '키워드2']
   */
  @IsArray()
  @IsString()
  keyWordList: string[];
}

export class CreateUserKeyWordResponseDto {
  /**
   * 키워드 리스트
   * @example ['키워드1', '키워드2']
   */
  keyWordList: string[];
}
