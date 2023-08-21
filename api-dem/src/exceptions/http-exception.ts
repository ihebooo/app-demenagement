import { HttpException, HttpStatus } from '@nestjs/common';

export function forbidden(message) {
  throw new HttpException(
    {
      status: HttpStatus.FORBIDDEN,
      error: message,
    },
    HttpStatus.FORBIDDEN,
  );
}

export function unauthorized(message) {
  throw new HttpException(
    {
      status: HttpStatus.UNAUTHORIZED,
      error: message,
    },
    HttpStatus.UNAUTHORIZED,
  );
}

export function notFound(message) {
  throw new HttpException(
    {
      status: HttpStatus.NOT_FOUND,
      error: message,
    },
    HttpStatus.NOT_FOUND,
  );
}

export function gapiError(message) {
  throw new HttpException(
    {
      status: 'fail',
      error: message,
    },
    HttpStatus.OK,
  );
}

export function fiableError(message) {
  throw new HttpException(
    {
      code: 1,
      message: message,
    },
    HttpStatus.OK,
  );
}

export function casino27Error(code, message) {
  throw new HttpException(
    {
      jsonrpc: '2.0',
      id: 0,
      error: {
        code: code,
        message: message,
      },
    },
    HttpStatus.OK,
  );
}

export function slotegratorError(code, message) {
  throw new HttpException(
    {
      error_code: code,
      error_description: message,
    },
    HttpStatus.OK,
  );
}

export function blueoceanError(StatusCode, message, balance = false) {
  throw new HttpException(
    {
      status: StatusCode,
      msg: message,
      ...(balance && {
        balance: balance,
      }),
    },
    HttpStatus.OK,
  );
}

export function customError(message) {
  throw new HttpException(
    {
      status: false,
      error: message,
    },
    HttpStatus.OK,
  );
}

export function betslipError(code, message) {
  throw new HttpException(
    {
      status: false,
      error: { code: code, message: message },
    },
    HttpStatus.OK,
  );
}
