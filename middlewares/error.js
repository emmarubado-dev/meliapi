import httpStatus  from 'http-status';
import {isProd, isDev}  from '../config/config.js';
import {logger}  from '../config/logger.js';
import {ApiError}  from '../utils/ApiError.js';

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (isProd() && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(isDev() && { stack: err.stack }),
  };

  if (isDev()) {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export {errorConverter, errorHandler};