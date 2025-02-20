import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthenticationException extends HttpException {
  constructor(message: string = '인증과정에서 오류가 발생하였습니다.') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
