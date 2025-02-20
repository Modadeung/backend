import { IsString, IsUUID } from 'class-validator';

export class CreateUserReservationDto {
  /**
   * 유저 아이디
   * @example 'uuid'
   */
  @IsUUID()
  userId: string;

  /**
   * 상점 아이디
   * @example 'uuid'
   */
  @IsUUID()
  storeId: string;

  /**
   * 시작 날짜
   * @example '2021-01-01'
   */
  @IsString()
  startDate: string;

  /**
   * 종료 날짜
   * @example '2021-01-02'
   */
  @IsString()
  endDate: string;
}
