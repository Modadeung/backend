import { IsString } from 'class-validator';

export class GetStoreDto {
  /**
   * 검색 키워드
   * @example ['편의점', '치킨']
   */
  @IsString({ each: true })
  keywordList: string[];
}

export class GetStoreResponseDto {
  /**
   * 상점 ID
   * @example 'uuid'
   */
  store_id: string;

  /**
   * 상점 이름
   * @example '편의점'
   */
  store_name: string;

  /**
   * 상점 설명
   * @example '24시간 편의점'
   */
  store_description: string;

  /**
   * 최소 가격
   * @example 10000
   */
  store_min_price: number;

  /**
   * 최대 가격
   * @example 60000
   */
  store_max_price: number;

  /**
   * 상점 별점
   * @example 4.5
   */
  store_scope: number;

  /**
   * 상점 리뷰
   * @example '좋아요'
   */
  store_review: string;

  /**
   * 상점 이미지 리스트
   * @example ['https://store-image-url.com']
   */
  imageUrlList: string[];

  /**
   * 키워드 리스트
   * @example ['키워드1']
   */
  keywordList: string[];
}
