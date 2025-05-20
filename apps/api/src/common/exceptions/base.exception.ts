import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly code?: string,
  ) {
    super(
      {
        message,
        code,
        status,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
}
