import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateStoreDto {
  /**
   * 상점 이름
   * @example '편의점'
   */
  @IsNumber()
  name: string;

  /**
   * 상점 설명
   * @example '24시간 편의점'
   */
  @IsString()
  description: string;

  /**
   * 상점 이미지
   * @example 'https://store-image-url.com
   */
  @IsString()
  imageUrl: string;

  /**
   * 별점
   * @example 4.5
   */
  @IsNumber()
  scope: number;

  /**
   * 리뷰
   * @example '좋아요'
   */
  @IsString()
  review: string;

  /**
   * 최소 주문 가격
   * @example 10000
   */
  @IsNumber()
  minPrice: number;

  /**
   * 최대 주문 가격
   * @example 60000
   */
  @IsNumber()
  maxPrice: number;

  /**
   * 키워드
   * @example ['키워드1', '키워드2']
   */
  @IsArray()
  @IsString({ each: true })
  keywordList: string[];
}
