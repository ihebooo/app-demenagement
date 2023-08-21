import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ValidationError } from 'class-validator';

import { isEmpty } from 'src/utils/global';

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const { statusCode, status, error, message } =
        exception.getResponse() as any;

      let _statusCode =
        status === false ? 500 : !isEmpty(statusCode) ? statusCode : status;

      response
        .status(_statusCode)
        .json({ status: false, error: error });
    } else if (exception instanceof QueryFailedError) {
      const { query, message, parameters, driverError, stack } = exception;

      let duplicate_key = 'duplicate key';
      let username_exist_match = 'users_username_organization_id_key';

      if (
        message.includes(duplicate_key) &&
        message.includes(username_exist_match)
      ) {
        let query_username = parameters[0];

        response.status(200).json({
          status: false,
          error: `Username : ${query_username} deja existe`,
        });
      } else {
        response.status(500).json({
          status: false,
          error: message,
        });
      }

    } else {
      response.status(500).json({
        status: false,
        error: exception.message,
      });
    }
  }
}
