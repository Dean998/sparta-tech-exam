import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      message: 'Validation failed',
      errors: Array.isArray((exceptionResponse as any).message)
        ? (exceptionResponse as any).message
        : [(exceptionResponse as any).message],
    };

    // Log the validation error
    console.error(
      `[${errorResponse.timestamp}] ${errorResponse.path} - Validation Error:`,
      errorResponse.errors,
    );

    response.status(status).json(errorResponse);
  }
}
