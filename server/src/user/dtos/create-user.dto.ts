import { IsString } from 'class-validator';

export class CreateUserDto {
  /**
   * 사용자 역할
   * @example '소상공인'
   */
  @IsString()
  role: string;
}

export class CreateUserResponseDto {
  /**
   * 사용자 ID
   * @example 'uuid'
   */
  id: string;

  /**
   * 사용자 역할
   * @example '소상공인'
   */
  role: string;
}
