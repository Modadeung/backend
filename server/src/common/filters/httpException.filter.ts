import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationException } from './custom.exception';
import { QueryFailedError } from 'typeorm';
import { EventBus } from '@nestjs/cqrs';
import { FilterSlackEvent } from 'src/slack';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly eventBus: EventBus) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'INTERNAL_SERVER_ERROR';
    let stackTrace = '';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      code = this.getErrorCode(status);
      stackTrace = exception.stack || '';
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      code = 'QUERY_ERROR';
      stackTrace = exception.stack || '';
    } else if (exception instanceof AuthenticationException) {
      status = exception.getStatus();
      code = 'AUTHENTICATION_ERROR';
      message = exception.message;
      stackTrace = exception.stack || '';
    } else if (exception instanceof Error) {
      message = exception.message;
      stackTrace = exception.stack || '';
    }

    // 스택 트레이스 글자 수 제한 (최대 1000자)
    stackTrace =
      stackTrace.length > 1000
        ? stackTrace.substring(0, 1000) + '...\n(생략됨)'
        : stackTrace;

    this.eventBus.publish(
      new FilterSlackEvent(
        code,
        status,
        request.method,
        request.url,
        message,
        stackTrace,
      ),
    );
    response.status(status).json({
      code,
      status,
      path: `${request.method} ${request.url}`,
      message,
    });
  }

  private getErrorCode(status: number): string {
    if (status === 401) return 'INVALID_TOKEN';
    if (status === 403) return 'FORBIDDEN';
    if (status === 404) return 'NOT_FOUND';
    return 'INTERNAL_ERROR';
  }
}
