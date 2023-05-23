import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(HttpExceptionsFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const { response } = exception;
    const ctx = host.switchToHttp();
    const { originalUrl, method } = ctx.getRequest();
    const { statusCode, message, error } = response;
    this.logger.error(
      `Error in method ${method} ${originalUrl}`,
      `Status code [${statusCode}] Error message [${error}][${message}]`,
      HttpExceptionsFilter.name,
    );
    super.catch(exception, host);
  }
}
