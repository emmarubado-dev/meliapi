import httpStatus from 'http-status';
import {ApiError} from '../utils/ApiError.js';
import {catchAsync} from '../utils/catchAsync.js';


//Users
const createUser = catchAsync(async (req, res,next) => {
  res.status(httpStatus.OK).send();
});
const getUser = catchAsync(async (req, res,next) => {
    res.status(httpStatus.OK).send();
});
const addService = catchAsync(async (req, res,next) => {
    res.status(httpStatus.OK).send();
});

export {createUser,getUser,addService };