import { IsString } from 'class-validator';

export class GetStoreDto {
  /**
   * 검색 키워드
   * @example ['편의점', '치킨']
   */
  @IsString({ each: true })
  keywordList: string[];
}
