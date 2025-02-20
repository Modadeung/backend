export class GetStoreDetailResponseDto {
  /**
   * 상점 ID
   * @example 'uuid'
   */
  id: string;

  /**
   * 상점 이름
   * @example '편의점'
   */
  name: string;

  /**
   * 상점 설명
   * @example '24시간 편의점'
   */
  description: string;

  /**
   * 최소 가격
   * @example 10000
   */
  minPrice: number;

  /**
   * 최대 가격
   * @example 60000
   */
  maxPrice: number;

  /**
   * 상점 별점
   * @example 4.5
   */
  scope: number;

  /**
   * 상점 리뷰
   * @example '좋아요'
   */
  review: string;

  /**
   * 키워드 리스트
   * @example ['키워드1']
   */
  keywordList: string[];

  /**
   * 상점 이미지 리스트
   * @example ['https://store-image-url.com']
   */
  storeImageList: string[];
}
