import express from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import { isTest } from './config/config.js';
import * as morgan from './config/morgan.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import { ApiError } from './utils/ApiError.js';
import indexRoutes from './routes/index.js';

const app = express();

if (!isTest()) {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

app.use(indexRoutes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
  
app.use(errorConverter);

app.use(errorHandler);

export {app};